import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import { MdDelete } from "react-icons/md";
import displayCOPCurrency from "../helpers/displayCurrency";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);
  const [coupons, setCoupons] = useState([]);

  const applyDiscount = (e) => {
    if (e.target.value) {
      let discount = coupons.filter(
        (object) => object.couponCode == e.target.value
      );
      console.long(discount);
    }
  };

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch(SummaryApi.discount.url, {
      method: SummaryApi.discount.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        setCoupons(res.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const handlePayment = async () => {
    const stripePromise = await loadStripe(
      process.env.REACT_APP_STRIPE_PUBLIC_KEY
    );
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartItems: data,
      }),
    });

    const responseData = await response.json();

    if (responseData?.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData.id });
    }

    console.log("payment response", responseData);
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );
  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No tienes productos en el carrito</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/***view product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart?.map((el, index) => {
                return (
                  <div
                    key={el + "Añadir al carrito Cargando" + index}
                    className="w-full bg-slate-200 h-30 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "Añadir al carrito Cargando"}
                    className="w-full bg-white h-30 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-30 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/**delete product */}
                      <div
                        className="absolute right-0 text-red-900 rounded-full p-2 hover:bg-red-900 hover:text-white cursor-pointer"
                        onClick={() => deleteCartProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>

                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-red-900 font-medium text-lg">
                          {displayCOPCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayCOPCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="border border-red-900 text-red-900 hover:bg-red-900 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            decraseQty(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-red-900 text-red-900 hover:bg-red-900 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/***summary  */}
        {data[0] && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-30 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-30 bg-white flex flex-col gap-3">
                <h2 className="text-white bg-red-900 px-4 py-1">Pago</h2>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Total de Productos</p>
                  <p>{totalQty}</p>
                </div>

                {/* Campo de dirección de envío */}
              <div className="flex flex-col gap-2 px-4">
              <label htmlFor="shippingAddress" className="font-medium text-lg text-slate-600">
              Dirección de Envío
              </label>
              <input
                type="text"
                id="shippingAddress"
                name="shippingAddress"
                placeholder="Ingrese su dirección de envío"
                className="w-full rounded-md p-2 ring-1 ring-inset ring-gray-400 focus:ring-red-900 focus:outline-none"
                />
              </div>

                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Precio Total</p>
                  <p>{displayCOPCurrency(totalPrice)}</p>
                </div>

                <div className="flex items-center w-full gap-2 pr-4 pl-4 justify-between">
                  <input
                    type="text"
                    name="Inpunt"
                    placeholder="Codigo de descuento"
                    class="w-56 rounded-md p-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                  />
                  <button
                    className="w-[30%] border border-black rounded-lg p-2 hover:bg-gray-500 hover:text-white"
                    onClick={(e) => applyDiscount(e)}
                  >
                    Aplicar
                  </button>
                </div>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Precio Con Descuento</p>
                  <p>{displayCOPCurrency(0, 0)}</p>
                </div>

                <button
                  className="bg-gray-600 p-2 text-white w-full mt-2"
                  onClick={handlePayment}
                >
                  Pagar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
