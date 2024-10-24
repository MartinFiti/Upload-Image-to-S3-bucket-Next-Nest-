import { Patient } from "@/types/patients";
import React from "react";

interface ModalProps {
  title: string;
  text: string;
  handleConfirm: (id: string) => void;
  handleClose: () => void;
  selectedItem: Patient;
}

const Modal = ({
  title,
  text,
  handleConfirm,
  handleClose,
  selectedItem,
}: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="mb-6">
          <p className="text-gray-600">{text}</p>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-700 focus:outline-none transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleConfirm(selectedItem.uuid)}
            className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded focus:outline-none transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
