import React, { useEffect, useState } from 'react';
import UploadCupon from '../components/UploadCupon'; // Asegúrate de tener este componente
import SummaryApi from '../common'; // Asegúrate de que las rutas de la API estén configuradas para cupones
import AdminCuponCard from '../components/AdminCuponCard'; // Tarjeta para mostrar cada cupón

const AllCupons = () => {
  const [openUploadCupon, setOpenUploadCupon] = useState(false);
  const [allCupons, setAllCupons] = useState([]);

  // Función para obtener todos los cupones
  const fetchAllCupons = async () => {
    try {
      const response = await fetch(SummaryApi.allCupon.url, {
        method: SummaryApi.allCupon.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Incluye el token si es necesario
        },
      });

      if (!response.ok) throw new Error('Error al cargar los cupones');

      const dataResponse = await response.json();
      console.log("Cupon data", dataResponse);

      setAllCupons(dataResponse.data || []); 
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllCupons();
  }, []);

  // Función para eliminar un cupón
  const handleDeleteCupon = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteCupon.url, {
        method: SummaryApi.deleteCupon.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Incluye el token si es necesario
        },
        body: JSON.stringify({ id }), // Envía el ID del cupón en el cuerpo
      });

      if (!response.ok) throw new Error('Error al eliminar el cupón');

      await fetchAllCupons(); // Volver a obtener los datos
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg text-blue-600'>Todos los Cupones</h2>
        <button 
          className='border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all py-1 px-3 rounded-full' 
          onClick={() => setOpenUploadCupon(true)}
        >
          Subir Cupón
        </button>
      </div>

      {/** Listado de cupones */}
      <div className='flex items-center flex-wrap gap-3 py-4 h-full overflow-y-scroll'>
        {
          allCupons.map((cupon) => (
            <AdminCuponCard key={cupon._id} data={cupon} onDelete={handleDeleteCupon} />
          ))
        }
      </div>

      {/** Componente de subir cupón */}
      {
        openUploadCupon && (
          <UploadCupon onClose={() => setOpenUploadCupon(false)} fetchData={fetchAllCupons} />
        )
      }
    </div>
  );
};

export default AllCupons;
