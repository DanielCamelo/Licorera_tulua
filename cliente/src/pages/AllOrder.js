import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import SummaryApi from '../common';
import displayCOPCurrency from '../helpers/displayCurrency';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AllOrder = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterType, setFilterType] = useState('all');
    const [searchEmail, setSearchEmail] = useState('');
    const [expandedOrders, setExpandedOrders] = useState({}); // Estado para controlar la expansión de cada orden

    const fetchOrderDetails = async () => {
        const response = await fetch(SummaryApi.allOrder.url, {
            method: SummaryApi.allOrder.method,
            credentials: 'include',
        });

        const responseData = await response.json();
        setData(responseData.data);
        setFilteredData(responseData.data);
    };

    useEffect(() => {
        fetchOrderDetails();
    }, []);

    const filterByDate = (type) => {
        setFilterType(type);
        const today = moment();

        if (type === 'day') {
            setFilteredData(data.filter(item => moment(item.createdAt).isSame(today, 'day')));
        } else if (type === 'month') {
            setFilteredData(data.filter(item => moment(item.createdAt).isSame(today, 'month')));
        } else if (type === 'year') {
            setFilteredData(data.filter(item => moment(item.createdAt).isSame(today, 'year')));
        } else {
            setFilteredData(data);
        }
    };

    const handleEmailSearch = (e) => {
        const email = e.target.value.toLowerCase();
        setSearchEmail(email);
        setFilteredData(
            data.filter(item => item.email?.toLowerCase().includes(email))
        );
    };

    const calculateDailyTotals = () => {
        const totals = {};

        filteredData.forEach(item => {
            const date = moment(item.createdAt).format('LL');
            if (!totals[date]) {
                totals[date] = 0;
            }
            totals[date] += item.totalAmount;
        });

        return Object.entries(totals).map(([date, total]) => ({ date, total }));
    };

    const toggleOrderDetails = (index) => {
        setExpandedOrders(prevState => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const dailyTotals = calculateDailyTotals();

    const chartData = {
        labels: dailyTotals.map(item => item.date),
        datasets: [
            {
                label: 'Ventas Totales (COP)',
                data: dailyTotals.map(item => item.total),
                backgroundColor: '#4CAF50',
            },
        ],
    };

    return (
        <div className="h-screen overflow-y-auto bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Órdenes y Ventas</h1>
            
            {/* Filtros */}
            <div className="flex justify-center gap-4 mb-4">
                <button 
                    onClick={() => filterByDate('day')}
                    className={`px-4 py-2 rounded-lg ${filterType === 'day' ? 'bg-red text-white' : 'bg-gray-300'}`}>
                    Hoy
                </button>
                <button 
                    onClick={() => filterByDate('month')}
                    className={`px-4 py-2 rounded-lg ${filterType === 'month' ? 'bg-red text-white' : 'bg-gray-300'}`}>
                    Este Mes
                </button>
                <button 
                    onClick={() => filterByDate('year')}
                    className={`px-4 py-2 rounded-lg ${filterType === 'year' ? 'bg-red text-white' : 'bg-gray-300'}`}>
                    Este Año
                </button>
                <button 
                    onClick={() => filterByDate('all')}
                    className={`px-4 py-2 rounded-lg ${filterType === 'all' ? 'bg-red text-white' : 'bg-gray-300'}`}>
                    Todos
                </button>
            </div>

            {/* Buscar por correo */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Buscar por correo del cliente"
                    value={searchEmail}
                    onChange={handleEmailSearch}
                    className="px-4 py-2 border rounded-lg w-full max-w-md"
                />
            </div>
            
            {/* Gráfica de Ventas */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
            
            {/* Lista de Órdenes */}
            <div className="space-y-6">
                {!filteredData.length && (
                    <p className="text-center text-gray-500">No hay órdenes disponibles.</p>
                )}
                {filteredData.map((item, index) => (
                    <div key={item.userId + index} className="bg-white rounded-lg shadow-md p-4">
                        {/* Encabezado de la orden */}
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg font-medium">{moment(item.createdAt).format('LL')}</p>
                                <p className="text-gray-600">Correo: <span className="font-semibold">{item.email || 'No especificado'}</span></p>
                                <p className="text-gray-600">Total: <span className="font-semibold">{displayCOPCurrency(item.totalAmount)}</span></p>
                            </div>
                            <button
                                onClick={() => toggleOrderDetails(index)}
                                className="px-4 py-2 rounded-lg bg-red text-white">
                                {expandedOrders[index] ? 'Ocultar Detalles' : 'Ver Detalles'}
                            </button>
                        </div>

                        {/* Detalles de la orden */}
                        {expandedOrders[index] && (
                            <div className="border rounded p-4 mt-2">
                                <div className="flex flex-col lg:flex-row justify-between">
                                    <div className="grid gap-4">
                                        {item?.productDetails.map((product, idx) => (
                                            <div key={product.productId + idx} className="flex gap-4">
                                                <img
                                                    src={product.image[0]}
                                                    alt={product.name}
                                                    className="w-28 h-28 bg-gray-200 object-cover rounded"
                                                />
                                                <div>
                                                    <div className="font-medium text-lg">{product.name}</div>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <div className="text-lg text-red-600">{displayCOPCurrency(product.price)}</div>
                                                        <p>Cantidad: {product.quantity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-4 p-4 min-w-[300px]">
                                        <div>
                                            <div className="text-lg font-medium">Detalles de Venta:</div>
                                            <p>Método de pago: {item.paymentDetails.payment_method_type[0]}</p>
                                            <p>Estado del pago: {item.paymentDetails.payment_status}</p>
                                        </div>
                                        <div>
                                            <div className="text-lg font-medium">Detalles de Envío:</div>
                                            {item.shipping_options.map((shipping, idx) => (
                                                <p key={shipping.shipping_rate + idx}>Pago del envío: {displayCOPCurrency(shipping.shipping_amount)}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="font-semibold text-right text-lg mt-4">
                                    Pago Total: {displayCOPCurrency(item.totalAmount)}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllOrder;



