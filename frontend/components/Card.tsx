"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Home,
  Trash2,
} from "lucide-react";
import { User } from "@/types/user";

interface UserCardProps {
  user: User;
  handleOpenModal: (p: User) => void;
}

export default function UserCard({ user, handleOpenModal }: UserCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [documentPhoto, setDocumentPhoto] =
    useState<string>("/defaultUser.jpg");

  useEffect(() => {
    const fetchDocumentPhoto = async () => {
      const res = await fetch(
        `/api/fms/presigned-url/view?key=${user.documentPhoto}`
      );

      const resJson = await res.text();
      setDocumentPhoto(resJson);
    };

    fetchDocumentPhoto();
  }, []);

  return (
    <div
      className={`flex flex-col relative bg-white shadow-md rounded-lg overflow-hidden ${
        isExpanded ? "pb-4" : "h-[96px]"
      }`}
    >
      <button onClick={() => setIsExpanded(!isExpanded)} className="p-4">
        <div className="flex items-center justify-start">
          <div className="flex flex-row items-center justify-center gap-2">
            {isExpanded ? (
              <ChevronUp className="w-6 h-6" color={"#000000"} />
            ) : (
              <ChevronDown className="w-6 h-6" color={"#000000"} />
            )}
            <div className="flex items-center space-x-4">
              <Image
                src={documentPhoto}
                alt={`${user.name}'s photo`}
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {user.name}
              </h2>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => handleOpenModal(user)}
        className="absolute right-4 top-[36px] text-red-500 hover:text-red-700 focus:outline-none transition-colors duration-200 z-20"
        aria-label="Delete user"
      >
        <Trash2 className="w-6 h-6" />
      </button>
      <div
        className={`px-4 space-y-2 transition-all duration-200 ease-in-out ${
          isExpanded
            ? "max-h-[96px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex items-center space-x-2 text-gray-600">
          <Mail className="w-5 h-5" />
          <span className="hover:underline cursor-pointer">{user.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Home className="w-5 h-5" />
          <span>{user.address}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Phone className="w-5 h-5" />
          <span className="hover:underline cursor-pointer">
            {user.phoneNumberCountryCode} {user.phoneNumber}
          </span>
        </div>
      </div>
    </div>
  );
}
