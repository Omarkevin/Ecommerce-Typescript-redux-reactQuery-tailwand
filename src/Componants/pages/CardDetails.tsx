import { useParams } from "react-router-dom";
import { useProductById } from "../../assets/Customs/useProductbyId";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";



import { addToCart } from "../../Redux/AddtoCard";
export default function CardDetails() {
    const nav = useNavigate(); 
  const { id } = useParams();
  const productId = Number(id);

  const { data: product, isLoading, error } = useProductById(productId);

  const [quantity, setQuantity] = useState<number>(1);
  const dispatch: Dispatch = useDispatch();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching product</p>;
  if (!product) return <p>No product found</p>;

  const handleAdd = () => {
    setQuantity((prev) => (prev < product.stock ? prev + 1 : prev));
  };

  const handleSubtract = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const totalPrice = (product.price * quantity).toFixed(2);
  ///////// usenav ///////////

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
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

      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full max-h-96 object-cover rounded"
      />
      <h1 className="text-3xl font-bold mt-6">{product.title}</h1>
      <p className="mt-3 text-gray-600">{product.description}</p>
      <div className="mt-4 text-lg text-green-700 font-semibold">
        Price per unit: ${product.price}
      </div>
      <div className="mt-1 text-sm text-gray-500">
        Rating: {product.rating} ⭐
      </div>
      <div className="mt-1 text-sm text-gray-500">
        Stock available: {product.stock}
      </div>

      {/* Quantity selector */}
      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={handleSubtract}
          className="w-8 h-8 flex items-center justify-center border rounded bg-gray-200 hover:bg-gray-300 text-xl"
        >
          -
        </button>
        <span className="text-xl">{quantity}</span>
        <button
          onClick={handleAdd}
          className="w-8 h-8 flex items-center justify-center border rounded bg-gray-200 hover:bg-gray-300 text-xl"
        >
          +
        </button>
      </div>

      {/* Total price */}
      <div className="mt-4 text-xl font-bold">
        Total Price: <span className="text-green-800">${totalPrice}</span>
      </div>

      {/* Add to cart button */}
      <button
        className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition"
        onClick={() => {
          console.log("Add to Cart:", {});
          dispatch(
            addToCart({
              id: product.id,
              title: product.title,
              price: product.price,
              thumbnail: product.thumbnail,
            })
          );
        }}
      >
        Add to Cart 🛒
      </button>
    </div>
  );
}
