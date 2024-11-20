import React, { useState } from 'react';
import SummaryApi from '../common';

const UploadCupon = ({ onClose, fetchData }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    codigo: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(SummaryApi.uploadCupon.url, {
        method: SummaryApi.uploadCupon.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Incluye el token si es necesario
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error al subir el cupón');

      await fetchData(); // Actualizar la lista de cupones
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-lg font-bold text-blue-600 mb-4">Subir Cupón</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            name="titulo" 
            placeholder="Título del cupón" 
            value={formData.titulo} 
            onChange={handleChange} 
            className="border border-gray-300 p-2 rounded"
            required
          />
          <textarea 
            name="descripcion" 
            placeholder="Descripción del cupón" 
            value={formData.descripcion} 
            onChange={handleChange} 
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input 
            type="text" 
            name="codigo" 
            placeholder="Código del cupón" 
            value={formData.codigo} 
            onChange={handleChange} 
            className="border border-gray-300 p-2 rounded"
            required
          />
          <div className="flex justify-between items-center mt-4">
            <button 
              type="button" 
              className="text-red-500 hover:underline"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all"
              disabled={loading}
            >
              {loading ? 'Subiendo...' : 'Subir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadCupon;
