import React from 'react';

const FeaturedProducts = () => {
  // Lista de productos destacados o populares (simulada aquí)
  const featuredProducts = [
    {
      id: 1,
      name: 'Whisky Premium',
      description: 'Un whisky excepcional para los amantes de los sabores suaves.',
      price: '$120.000',
      imageUrl: '/.asset/products/bebidas_sin_alcohol/licores/buchanans.jpg/', // Reemplaza con URL de imagen real
    },
    {
      id: 2,
      name: 'Cerveza Artesanal',
      description: 'Cerveza con un sabor único y refrescante.',
      price: '$10.000',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Vino Tinto Reserva',
      description: 'Vino tinto con cuerpo ideal para maridar.',
      price: '$80.000',
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProducts.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-lg">
          <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-green-500 font-bold mt-2">{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;
