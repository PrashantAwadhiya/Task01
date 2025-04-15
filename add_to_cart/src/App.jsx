import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [products, setproducts] = useState([]);
  const [fullDescription, setfullDescription] = useState({});
  const [cartProduct, setcartProduct] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setproducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = (elem) => {
    const existingProduct = cartProduct.find((product) => product.id === elem.id);
    if (existingProduct) {
      setcartProduct(
        cartProduct.map((product) =>
          product.id === elem.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    } else {
      setcartProduct([...cartProduct, { ...elem, quantity: 1 }]);
    }
  };

  const removeProduct = (id) => {
    const updatedCart = cartProduct.filter((product) => product.id !== id);
    setcartProduct(updatedCart);
  };

  const incrementQuantity = (id) => {
    setcartProduct(
      cartProduct.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  const decrementQuantity = (id) => {
    setcartProduct(
      cartProduct.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(product.quantity - 1, 1) }
          : product
      )
    );
  };

  const toggleDescription = (index) => {
    setfullDescription((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Products Section */}
      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((elem, idx) => {
            const isFull = fullDescription[idx];
            const MAX_LENGTH = 100;

            return (
              <div
                key={elem.id}
                className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-200 flex flex-col justify-between"
              >
                <div className="h-60 w-full relative">
                  <span className="absolute top-2 left-2 px-3 py-1 text-sm font-medium bg-blue-500 text-white rounded-xl">
                    {elem.rating?.rate} ⭐
                  </span>
                  <img
                    className="h-full w-full object-contain"
                    src={elem.image}
                    alt={elem.title}
                  />
                </div>
                <h1 className="text-lg font-bold mt-4 text-gray-800">
                  {elem.title}
                </h1>
                <p className="text-gray-600 mt-2">
                  {isFull
                    ? elem.description
                    : `${elem.description.slice(0, MAX_LENGTH)}...`}
                  {elem.description.length > MAX_LENGTH && (
                    <span
                      onClick={() => toggleDescription(idx)}
                      className="text-blue-500 cursor-pointer ml-1 font-medium"
                    >
                      {isFull ? "Show less" : "Read more"}
                    </span>
                  )}
                </p>
                <p className="text-lg font-semibold mt-2 text-green-600">
                  Price: ${elem.price}
                </p>
                <button
                  onClick={() => addToCart(elem)}
                  className="w-full mt-4 py-2 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 active:scale-95 transition duration-200"
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-full lg:w-[400px] bg-white p-6 shadow-2xl rounded-xl mt-8 lg:mt-0 lg:ml-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
          Cart <i className="ri-shopping-cart-2-line ml-3"></i>
        </h2>
        {cartProduct.length === 0 ? (
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          cartProduct.map((info) => (
            <div
              key={info.id}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg mb-4 shadow-sm"
            >
              <img
                src={info.image}
                alt={info.title}
                className="w-16 h-16 object-contain"
              />
              <div className="flex flex-col w-full">
                <h3 className="font-semibold text-gray-700">{info.title}</h3>
                <p className="font-bold text-green-600">${info.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decrementQuantity(info.id)}
                    className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-semibold">{info.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(info.id)}
                    className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <span
                onClick={() => removeProduct(info.id)}
                className="text-red-500 cursor-pointer text-xl hover:text-red-600"
              >
                <i className="ri-delete-bin-line"></i>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
