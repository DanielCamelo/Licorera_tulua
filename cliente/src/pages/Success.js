import React from 'react'
import SUCCESSIMAGE from '../assest/success.gif'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
      <img
        src={SUCCESSIMAGE}
        width={150}
        height={150}
      />
      <p className='text-red-900 font-bold text-xl'>Pago Exitoso</p>
      <Link to={"/order"} className='p-2 px-3 mt-5 border-2 border-red-900 rounded font-semibold text-red-900 hover:bg-red-900 hover:text-white'>Ver pedido</Link>
    </div>
  )
}

export default Success
