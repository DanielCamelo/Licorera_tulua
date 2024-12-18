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
    trigger: 'continuar',
  },
  {
    id: 'pedidos',
    message: 'Puedes revisar tus pedidos recientes en la sección de Pedidos en el menú principal.',
    trigger: 'continuar',
  },
  {
    id: 'recomendaciones',
    message: 'Basado en tus compras anteriores, te recomendamos nuestros licores premium. ¿Te gustaría ver una lista?',
    trigger: 'continuar',
  },
  {
    id: 'promocion',
    message: 'Tenemos promociones especiales este mes. ¡No te las pierdas en la sección de Promociones!',
    trigger: 'continuar',
  },
  {
    id: 'continuar',
    message: '¿Necesitas ayuda con algo más?',
    trigger: 'opcion-continuar',
  },
  {
    id: 'opcion-continuar',
    options: [
      { value: 'si', label: 'Sí', trigger: '2' },
      { value: 'no', label: 'No', trigger: 'final' },
    ],
  },
  {
    id: 'final',
    message: '¡Gracias por contactarnos! Que tengas un excelente día.',
    end: true,
  },
];

export default steps;
