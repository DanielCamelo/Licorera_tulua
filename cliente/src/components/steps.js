const steps = [
  {
    id: '1',
    message: '¡Hola! ¿En qué puedo ayudarte hoy?',
    trigger: '2', // Apunta al ID del siguiente paso
  },
  {
    id: '2',
    options: [
      { value: 'facturacion', label: 'Facturación', trigger: 'facturacion' },
      { value: 'pedidos', label: 'Pedidos', trigger: 'pedidos' },
      { value: 'recomendaciones', label: 'Recomendaciones', trigger: 'recomendaciones' },
      { value: 'promocion', label: 'Promoción', trigger: 'promocion' },
    ],
  },
  {
    id: 'facturacion',
    message: 'Para la facturación, por favor ingresa a tu cuenta y accede a la sección de Facturación en el menú principal. ¿Necesitas algo más?',
    trigger: '2',
  },
  {
    id: 'pedidos',
    message: 'Puedes revisar tus pedidos recientes en la sección de Pedidos en el menú principal. ¿Te puedo ayudar con algo más?',
    trigger: '2',
  },
  {
    id: 'recomendaciones',
    message: 'Basado en tus compras anteriores, te recomendamos nuestros licores premium. ¿Te gustaría ver una lista?',
    trigger: '2',
  },
  {
    id: 'promocion',
    message: 'Tenemos promociones especiales este mes. ¡No te las pierdas en la sección de Promociones! ¿Quieres saber más?',
    trigger: '2',
  },
];

export default steps;
