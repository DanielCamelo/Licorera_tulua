import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUserCircle, FaPencilAlt, FaSave } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import displayCOPCurrency from '../helpers/displayCurrency';
import moment from 'moment';
import 'moment/locale/es';
import ROLE from '../common/role';

moment.locale('es');

const FacePanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // Estados para editar campos
  const [editableFields, setEditableFields] = useState({
    name: user?.name || '',
    age: user?.age || '',
    email: user?.email || '',
    password: user?.password || '',
    role: user?.role || '',
    status: user?.status || '',
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    age: false,
    email: false,
    password: false,
    role: false,
    status: false
  });

  const [showUserInfo, setShowUserInfo] = useState(false);

  // Redirigir si el usuario no es administrador
  useEffect(() => {
    if (user?.role !== ROLE.Administrador) {
      navigate('/');
    }
  }, [user, navigate]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: 'include',
    });

    const responseData = await response.json();
    setData(responseData.data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const toggleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const saveField = (field) => {
    console.log(`Guardado: ${field} - Valor:`, editableFields[field]);
    toggleEdit(field);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleShowUserInfo = () => {
    setShowUserInfo(true);
  };

  return (
    <div
      className="min-h-[calc(150vh)] md:flex hidden"
      style={{
        backgroundImage: "url('/david.jpg')",
        backgroundSize: "50% 70%",
        medida: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Sidebar del administrador */}
      <aside className="bg-red min-h-full w-full max-w-60 pt-10">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilepic ? (
              <img
                src={user?.profilepic}
                className="w-20 h-20 rounded-full bg-white"
                alt={user?.name}
              />
            ) : (
              <FaUserCircle className="text-white" />
            )}
          </div>
          <p className="capitalize text-lg text-white font-bold">{user?.name}</p>
          <p className="text-white font-bold">Perfil</p>
        </div>

        <nav className="grid p-4">
          <Link
            to={"/perfil"}
            onClick={handleShowUserInfo}
            className="block px-4 py-2 rounded-lg text-white font-bold hover:bg-red-700"
          >
            Actualizar Datos
          </Link>
          <Link
            to={"/order"}
            onClick={handleShowUserInfo}
            className="block px-4 py-2 rounded-lg text-white font-bold hover:bg-red-700"
          >
            Historial De Compras
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default FacePanel;