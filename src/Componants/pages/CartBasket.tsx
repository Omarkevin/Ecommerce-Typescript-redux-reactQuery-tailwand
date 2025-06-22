import type { RootState } from "../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../Redux/AddtoCard";
import { useNavigate } from "react-router-dom";

export default function CartBasket() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full">
      {/* Navigation Button */}
      <div className="container mx-auto px-4 pt-6">
        <button
          onClick={() => nav(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Shop
        </button>
      </div>

      {/* Cart Container */}
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Cart Header */}
          <div className="bg-gray-400 px-6 py-4 sm:px-8 sm:py-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Your Shopping Cart
            </h1>
          </div>

          {/* Cart Content */}
          <div className="p-6 sm:p-8">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Looks like you haven't added any items yet
                </p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-4">
                  {items.map((el) => (
                    <div
                      key={el.id}
                      className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <img
                          src={el.thumbnail}
                          alt={el.title}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border border-gray-200"
                        />
                        <div className="flex-1">
                          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                            {el.title}
                          </h2>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              Qty: {el.quantity || 1}
                            </span>
                            <span className="text-lg font-medium text-indigo-600">
                              ${(el.price * (el.quantity || 1)).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(el.id))}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors px-3 py-1 sm:px-4 sm:py-2 border border-red-100 hover:border-red-200 rounded-lg"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm sm:text-base">Remove</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-200">
                    <span className="text-xl font-semibold">Total</span>
                    <span className="text-2xl font-bold text-indigo-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <button className="w-full bg-gray-400 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors duration-300">
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
