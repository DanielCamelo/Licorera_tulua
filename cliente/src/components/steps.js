const steps = [
    {
      id: '1',
      message: '¡Hola! ¿En qué puedo ayudarte hoy?',
      trigger: '2',
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
      message: 'Para la facturación, por favor ingresa a tu cuenta y accede a la sección de Facturación en el menú principal.',
      end: true,
    },
    {
      id: 'pedidos',
      message: 'Puedes revisar tus pedidos recientes en la sección de Pedidos en el menú principal.',
      end: true,
    },
    {
      id: 'recomendaciones',
      message: 'Basado en tus compras anteriores, te recomendamos nuestros licores premium. ¿Te gustaría ver una lista?',
      end: true,
    },
    {
      id: 'promocion',
      message: 'Tenemos promociones especiales este mes. ¡No te las pierdas en la sección de Promociones!',
      end: true,
    },
  ];
  
  export default steps;
  