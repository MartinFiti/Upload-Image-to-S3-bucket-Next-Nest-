"use client";

import { useState, useEffect } from "react";
import NewPatientForm from "../components/NewPatientForm";
import PatientCard from "../components/Card";
import { Patient } from "@/types/patients";
import Loader from "@/components/Loader";
import GenericModal from "@/components/GenericModal";
import { toast } from "react-toastify";

export default function PatientManagementLayout() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCardForDeletion, setSelectedCardForDeletion] =
    useState<Patient | null>(null);

  useEffect(() => {
    fetch("/api/patients").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setPatients(data);
          localStorage.setItem("patients", JSON.stringify(data));
        });
      }
      setIsLoading(false);
    });
  }, []);

  const addPatient = (newPatient: Patient) => {
    setPatients((prevPatients) => {
      const updatedPatients = [...prevPatients, newPatient];
      localStorage.setItem("patients", JSON.stringify(updatedPatients));
      return updatedPatients;
    });
  };

  const handleOpenModal = (patient: Patient) => {
    setSelectedCardForDeletion(patient);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedCardForDeletion(null);
  };

  const removePatient = async (uuid: string) => {
    try {
      const res = await fetch(`/api/patients/${uuid}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPatients((prevPatients) => {
          const updatedPatients = prevPatients.filter(
            (patient) => patient.uuid !== uuid
          );
          localStorage.setItem("patients", JSON.stringify(updatedPatients));
          return updatedPatients;
        });
        toast.success("Patient deleted successfully");
      } else {
        toast.error("Failed to delete patient");
      }
    } catch (error) {
      console.error("Error deleting patient", error);
      toast.error("Failed to delete patient");
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div className="flex flex-col container mx-auto w-full h-full px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Patient Management</h1>
        <NewPatientForm onSubmit={addPatient} />
      </div>
      {isLoading && <Loader text="Loading Patients" />}
      {isModalVisible && selectedCardForDeletion && (
        <GenericModal
          title="Confirm Deletion"
          text={`Are you sure you want to delete "${selectedCardForDeletion.name}"?`}
          handleConfirm={removePatient}
          handleClose={handleCloseModal}
          selectedItem={selectedCardForDeletion}
        />
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {patients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </div>
    </div>
  );
}
