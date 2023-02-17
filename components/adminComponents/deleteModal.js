import React from 'react'
  
  const DeleteConfirmationModal = ({ show, onConfirm, onClose })   => {
    const modalClass = show ? "block" : "hidden";
    
    return (
      <div className={`fixed z-50 top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center ${modalClass}`}>
      <div className="bg-white dark:bg-black rounded-lg shadow-md p-4">
        <p>Are you sure you want to delete this item?</p>
        <div className="mt-4 flex justify-end">
              <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full mr-2" onClick={onClose}>Cancel</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={onConfirm}>Delete</button>
              </div>
      </div>
    </div>
    );
  }
  export default DeleteConfirmationModal

