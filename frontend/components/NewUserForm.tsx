"use client";

import { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { User } from "@/types/user";
import { v4 as uuidv4 } from "uuid";

interface NewUserFormProps {
  onSubmit: (newUser: User) => void;
}

export default function NewUserForm({ onSubmit }: NewUserFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumberCountryCode: "+1",
    phoneNumber: "",
  });
  const [documentPhoto, setDocumentPhoto] = useState<string | null>(null);
  const [documentPhotoFile, setDocumentPhotoFile] = useState<File | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    documentPhoto: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    address: false,
    phoneNumber: false,
    documentPhoto: false,
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      address: "",
      phoneNumber: "",
      documentPhoto: "",
    };

    if (!/^[A-Za-z]+$/.test(formData.name.trim())) {
      newErrors.name = "Name can only contain letters";
    }

    if (!/^[^\s@]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = "Please enter a valid only gmail address";
    }

    if (formData.address.trim().length === 0) {
      newErrors.address = "Address is required";
    }

    if (
      !/^\d{1,10}$/.test(formData.phoneNumber) ||
      formData.phoneNumber.length > 10
    ) {
      newErrors.phoneNumber =
        "Please enter a valid phone number up to 10-digit";
    }

    if (!documentPhoto) {
      newErrors.documentPhoto = "Please upload a photo";
    }

    setErrors(newErrors);
    setIsFormValid(Object.values(newErrors).every((error) => error === ""));
  };

  useEffect(() => {
    validateForm();
  }, [formData, documentPhoto]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          photo: "File size should not exceed 5MB",
        }));
        setDocumentPhoto(null);
        return;
      }
      setDocumentPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setDocumentPhoto(event.target.result as string);
          setTouched((prevTouched) => ({
            ...prevTouched,
            documentPhoto: true,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isFormValid) {
        const photoUuid = uuidv4().replace(/[^a-zA-Z0-9]/g, "");
        const userRes = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            documentPhoto: "profile/" + formData.name + photoUuid + ".jpg",
          }),
        });

        if (userRes.ok) {
          const userData = await userRes.json();
          const res = await fetch(
            `/api/fms/presigned-url/upload?key=profile/${formData.name}${photoUuid}.jpg&contentType=image/jpg`
          );

          if (res.ok) {
            const url = await res.text();
            const uploadRes = await fetch(url, {
              method: "PUT",
              headers: {
                "Content-Type": "image/jpg",
              },
              body: documentPhotoFile,
            });

            if (uploadRes.ok) {
              toast.success("User has been created successfully!");
              onSubmit({
                ...userData,
                documentPhoto: "profile/" + formData.name + photoUuid + ".jpg",
              });
              setIsModalOpen(false);
              resetForm();
            } else {
              toast.error("Failed to upload photo");
            }
          }
        } else {
          toast.error("Email already exists");
        }
      }
    } catch (error) {
      console.error("Error creating user", error);
      toast.error("Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      address: "",
      phoneNumber: "",
      phoneNumberCountryCode: "+1",
    });
    setDocumentPhoto(null);
    setErrors({
      name: "",
      email: "",
      address: "",
      phoneNumber: "",
      documentPhoto: "",
    });
    setTouched({
      name: false,
      email: false,
      address: false,
      phoneNumber: false,
      documentPhoto: false,
    });
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        New User
      </button>

      {isModalOpen && (
        <div className="flex fixed justify-center items-center inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="flex relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Add New User
              </h3>
              <form onSubmit={handleSubmit} className="mt-2 text-left">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  {touched.name && errors.name && (
                    <p className="text-red-500 text-xs italic mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-xs italic mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  {touched.address && errors.address && (
                    <p className="text-red-500 text-xs italic mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <select
                      id="phoneNumberCountryCode"
                      name="phoneNumberCountryCode"
                      value={formData.phoneNumberCountryCode}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded-l py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    >
                      <option value="+1">+1 (USA)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+61">+61 (Australia)</option>
                      <option value="+91">+91 (India)</option>
                      <option value="+598">+598 (Uruguay)</option>
                    </select>

                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded-r w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  {touched.phoneNumber && errors.phoneNumber && (
                    <p className="text-red-500 text-xs italic mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="photo"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Photo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    onChange={handlePhotoUpload}
                    accept=".jpg"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  {touched.documentPhoto && errors.documentPhoto && (
                    <p className="text-red-500 text-xs italic mt-1">
                      {errors.documentPhoto}
                    </p>
                  )}
                  {documentPhoto && (
                    <div className="mt-2">
                      <Image
                        src={documentPhoto}
                        alt="Uploaded photo"
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                      isFormValid
                        ? "hover:bg-blue-700"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!isFormValid || isLoading}
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      "Submit"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
