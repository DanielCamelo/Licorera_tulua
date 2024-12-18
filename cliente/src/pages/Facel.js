import React, { useEffect, useState } from 'react';
import SummaryApi from '../common'; // Ruta al archivo de configuración
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FaUserCircle} from 'react-icons/fa';
import { Link} from 'react-router-dom';


const Facel = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const user = useSelector(state => state?.user?.user)
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(SummaryApi.current_user.url, {
          method: SummaryApi.current_user.method,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const dataApi = await response.json();
        if (dataApi.success) {
          setUserDetails(dataApi.data);
          setFormData({
            name: dataApi.data.name || '',
            age: dataApi.data.age || '',
            phone: dataApi.data.phone || '',
            email: dataApi.data.email || '',
            password: dataApi.data.password || ''
          });
        } else {
          toast.error(dataApi.message || 'Error al obtener datos del usuario');
        }
      } catch (err) {
        toast.error('Error al cargar los datos del usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(SummaryApi.actualizarUser.url, {
        method: SummaryApi.actualizarUser.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: formData.name,
          age: formData.age,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }), // No incluimos `status` aquí
      });

      const dataApi = await response.json();
      console.log('Response:', dataApi); // Agrega este log para ver la respuesta completa

      if (dataApi.success) {
        toast.success('Perfil actualizado correctamente');
        setUserDetails(dataApi.data); // Actualiza los detalles del usuario
        setEditing(false); // Cambia de nuevo a la vista de perfil
      } else {
        toast.error(dataApi.message || 'Error al actualizar el perfil');
      }
    } catch (err) {
      toast.error('Error al guardar los cambios');
      console.error('Error:', err); // Agrega este log para ver el error completo
    }
  };

  return (
    
    <section id="perfil-cliente" className="flex  min-h-screen bg-gray-50">
      <aside className='bg-red min-h-full  w-full  max-w-60'>
                      <div className='h-32  flex justify-center items-center flex-col'>
                          <div className='text-5xl cursor-pointer relative flex justify-center'>
                              {
                              user?.profilepic ? (
                                  
                                  <img src={user?.profilepic} className='w-20 h-20 rounded-full bg-white' alt={user?.name}></img>
                              ) : (
                                  <FaUserCircle />
                              )
                              }
                          </div>
                          <p className='capitalize text-lg text-white font-bold'>{user?.name}</p>
                          <p className='text-white font-bold '>{user?.role}</p>
                      </div>
      
                       {/***navigation */}       
                      <div>   
                          <nav className='grid p-4'>
                              <Link to={"/perfil"} className='block px-4 py-2 rounded-lg text-white font-bold : hover:bg-red-900'>Actualizar Datos</Link>
                              <Link to={"/order"} className='block px-4 py-2 rounded-lg text-white font-bold : hover:bg-red-900'>Historial De Compras</Link>

                          </nav>
                      </div>  
              </aside>
              <div className="bg-white p-5 w-full max-w-md mx-auto rounded-3xl shadow-lg max-h-[80vh] overflow-auto m-6">
  <h2 className="text-center font-bold text-xl mb-6">Perfil del Cliente</h2>
  {loading ? (
    <p className="text-center text-gray-500">Cargando...</p>
  ) : userDetails ? (
    <div className="text-gray-700">
      {editing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Correo</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Teléfono</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Edad</label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Guardar Cambios
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <p><strong>Nombre:</strong> {userDetails.name}</p>
          <p><strong>Edad:</strong> {userDetails.age}</p>
          <p><strong>Correo:</strong> {userDetails.email}</p>
          <p><strong>Teléfono:</strong> {userDetails.phone}</p>
          <p><strong>Rol:</strong> {userDetails.role}</p>
          <button
            onClick={() => setEditing(true)}
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition mt-4"
          >
            Editar Perfil
          </button>
        </div>
      )}
    </div>
  ) : (
    <p className="text-center text-red-500">No se pudo cargar el perfil.</p>
  )}
</div>


    </section>
  );
};


export default Facel