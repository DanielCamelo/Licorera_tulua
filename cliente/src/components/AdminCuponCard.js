import React from 'react';
import { MdDelete } from "react-icons/md";

const AdminCuponCard = ({ data, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cupón?')) {
      onDelete(data._id); // Llamar a la función para eliminar el cupón
    }
  };

  return (
    <div className="cupon-card border rounded-lg shadow-lg p-2 mb-4 bg-white transition-transform transform hover:scale-105 w-48 h-32"> {/* Tamaño fijo */}
      <div className="h-24 overflow-hidden mb-2">
        <h3 className="text-sm font-bold text-gray-800 truncate">{data.titulo}</h3> {/* Título del cupón */}
        <p className="text-xs text-gray-600 truncate">{data.descripcion}</p> {/* Descripción del cupón */}
        <p className="text-sm font-medium text-blue-600 truncate">Código: {data.codigo}</p> {/* Código del cupón */}
      </div>
      <button 
        onClick={handleDelete} 
        className="flex items-center justify-center bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition duration-200 w-8 h-8" // Botón de eliminación
      >
        <MdDelete className="text-base" />
      </button>
    </div>
  );
};

export default AdminCuponCard;

