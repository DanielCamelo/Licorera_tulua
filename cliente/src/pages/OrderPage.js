import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import displayCOPCurrency from '../helpers/displayCurrency';
import moment from 'moment';
import 'moment/locale/es'; // Importa el idioma español
moment.locale('es'); // Configura el idioma a español

const OrderPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState([]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.getOrder.url, {
        method: SummaryApi.getOrder.method,
        credentials: 'include',
      });
      const responseData = await response.json();
      setData(responseData.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const toggleOrderDetails = (index) => {
    setExpandedOrders((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Mis Pedidos
      </h1>

      {/* Indicador de carga */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="loader border-t-4 border-red-900 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      {/* Sin pedidos */}
      {!loading && data.length === 0 && (
        <div className="text-center text-gray-600 mt-10">
          <p className="text-lg">No se encontraron pedidos.</p>
          <button
            onClick={fetchOrderDetails}
            className="mt-4 px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-700"
          >
            Recargar Pedidos
          </button>
        </div>
      )}

      {/* Lista de pedidos */}
      <div className="space-y-6">
        {data.map((order, index) => (
          <div
            key={order.userId + index}
            className="bg-white shadow-md rounded-lg p-6"
          >
            {/* Fecha y encabezado */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-lg text-gray-800">
                  Pedido del: {moment(order.createdAt).format('LL')}
                </p>
                <p className="text-gray-600">
                  Total: {displayCOPCurrency(order.totalAmount)}
                </p>
              </div>
              <button
                onClick={() => toggleOrderDetails(index)}
                className="px-4 py-2 text-red-900 border border-red-900 rounded-lg hover:bg-red-900 hover:text-white"
              >
                {expandedOrders.includes(index) ? 'Ocultar Detalles' : 'Ver Detalles'}
              </button>
            </div>

            {/* Detalles del pedido */}
            {expandedOrders.includes(index) && (
              <div className="mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Productos */}
                  <div>
                    <h2 className="font-medium text-lg mb-2 text-gray-700">
                      Productos
                    </h2>
                    <div className="space-y-4">
                      {order.productDetails.map((product, idx) => (
                        <div
                          key={product.productId + idx}
                          className="flex items-center gap-4"
                        >
                          <img
                            src={product.image[0]}
                            alt={product.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-800">
                              {product.name}
                            </p>
                            <p className="text-gray-600">
                              Precio: {displayCOPCurrency(product.price)}
                            </p>
                            <p className="text-gray-600">
                              Cantidad: {product.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div>
                    <h2 className="font-medium text-lg mb-2 text-gray-700">
                      Información del Pedido
                    </h2>
                    <p className="text-gray-600">
                      Método de pago:{' '}
                      <span className="font-medium">
                        {order.paymentDetails.payment_method_type[0]}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Estado del pago:{' '}
                      <span className="font-medium">
                        {order.paymentDetails.payment_status}
                      </span>
                    </p>
                    <h2 className="font-medium text-lg mt-4 mb-2 text-gray-700">
                      Detalles del Envío
                    </h2>
                    {order.shipping_options.map((shipping, idx) => (
                      <p
                        key={shipping.shipping_rate + idx}
                        className="text-gray-600"
                      >
                        Envío: {displayCOPCurrency(shipping.shipping_amount)}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;

