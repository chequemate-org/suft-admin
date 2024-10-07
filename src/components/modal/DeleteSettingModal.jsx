// components/modal/DeleteModal.jsx

import React from "react";
import { Button } from "@windmill/react-ui";

const DeleteSettingModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-100">
      <div className="bg-white dark:bg-gray- p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">Are you sure you want to delete the settings?</h2>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose} className="mr-2">Cancel</Button>
          <Button onClick={onDelete} className="bg-red-500">Delete</Button>
        </div>
      </div>
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
    </div>
  );
};

export default DeleteSettingModal;
