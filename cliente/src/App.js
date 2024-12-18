import './App.css';
import { Outlet } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Componentes
import Header from './components/Header';
import CategoryList from './components/CategoryList';
import Chat from './components/Chat';

// Recursos
import AvisoImage from "./assest/fiesta.jpg";
import { FaWhatsapp } from 'react-icons/fa';

// Notificaciones y Contexto
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from './context';

// API y Redux
import SummaryApi from './common';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const [cartProductCount, setCartProductCount] = useState(0);
  const [showBanner, setShowBanner] = useState(true);

  const fetchUserDetails = useCallback(async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  }, [dispatch]);

  const fetchUserAddToCart = useCallback(async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count || 0);
  }, []);

  const mayorEdad = () => setShowBanner(false);
  const menorEdad = () => toast.error('Acceso denegado para menores de edad');

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, [fetchUserDetails, fetchUserAddToCart]);

  return (
    <>
    <div className={showBanner ? 'no-interaction' : ''}>
    {/* El resto de tu contenido de la página aquí */}


      {showBanner && !user?._id && (
        <div className="overlay-container">
          <div className="overlay"></div>
          <div id="floatingWindow" className="floating-window">
            <h2 className="font-bold text-[36px]">Bienvenido</h2>
            <div className="image-container">
              <img src={AvisoImage} alt="Aviso" />
            </div>
            <p className="message-top">Para ingresar a este sitio web debes ser mayor de edad</p>
            <div>
              <button id="button1" className="button1" onClick={mayorEdad}>
                Soy mayor de 18
              </button>
              <button id="button2" className="button2" onClick={menorEdad}>
                Soy menor de 18
              </button>
            </div>
            <p className="message-top">
              El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de alcohol a menores de edad.
            </p>
          </div>
        </div>
      )}
    </div>

      <div>
        <div className="floating-button-container">
          <a
            href="https://wa.me/573167809782"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-icon"
          >
            <FaWhatsapp size={45} color="white" />
          </a>
          <Chat />
        </div>
        <Context.Provider
          value={{
            fetchUserDetails,
            cartProductCount,
            fetchUserAddToCart,
          }}
        >
          <ToastContainer className="rounded-full" position="top-right" autoClose={1000} />
          <Header />
          <CategoryList />
          <main className="min-h-screen relative">
            <Outlet />
          </main>
        </Context.Provider>
      </div>
    </>
  );
}

export default App;
