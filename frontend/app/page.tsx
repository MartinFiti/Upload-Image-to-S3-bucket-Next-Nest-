"use client";

import { useState, useEffect } from "react";
import NewUserForm from "../components/NewUserForm";
import UserCard from "../components/Card";
import { User } from "@/types/user";
import Loader from "@/components/Loader";
import GenericModal from "@/components/GenericModal";
import { toast } from "react-toastify";

export default function UserManagementLayout() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCardForDeletion, setSelectedCardForDeletion] =
    useState<User | null>(null);

  useEffect(() => {
    fetch("/api/users").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setUsers(data);
          localStorage.setItem("users", JSON.stringify(data));
        });
      }
      setIsLoading(false);
    });
  }, []);

  const addUser = (newUser: User) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  };

  const handleOpenModal = (user: User) => {
    setSelectedCardForDeletion(user);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedCardForDeletion(null);
  };

  const removeUser = async (uuid: string) => {
    try {
      const res = await fetch(`/api/users/${uuid}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers((prevUsers) => {
          const updatedUsers = prevUsers.filter((user) => user.uuid !== uuid);
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          return updatedUsers;
        });
        toast.success("User deleted successfully");
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user", error);
      toast.error("Failed to delete user");
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div className="flex flex-col container mx-auto w-full h-full px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <NewUserForm onSubmit={addUser} />
      </div>
      {isLoading && <Loader text="Loading Users" />}
      {isModalVisible && selectedCardForDeletion && (
        <GenericModal
          title="Confirm Deletion"
          text={`Are you sure you want to delete "${selectedCardForDeletion.name}"?`}
          handleConfirm={removeUser}
          handleClose={handleCloseModal}
          selectedItem={selectedCardForDeletion}
        />
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </div>
    </div>
  );
}
