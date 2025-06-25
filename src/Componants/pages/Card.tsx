import { Link } from "react-router-dom";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { Product } from "../../assets/Customs/FetchData";



interface CardProps {
  data: Product[];
  isloading: boolean;
  error: string | null;
  itemsPerPage: number;
  currentpage: number;
  setcurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Card({
  isloading,
  error,
  itemsPerPage,
  currentpage,
  setcurrentPage,
  data,
}: CardProps) {
  const maxproducts = 100;
  const totalPages = Math.ceil(maxproducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setcurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentpage - 2);
    let endPage = Math.min(totalPages, currentpage + 2);

    // Adjust if we're near the start or end
    if (currentpage <= 3) {
      endPage = Math.min(5, totalPages);
    } else if (currentpage >= totalPages - 2) {
      startPage = Math.max(totalPages - 4, 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }

    return buttons;
  };

  if (isloading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-gray-500">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-center text-gray-500 text-lg">
          No products found. Try adjusting your filters.
        </p>
      </div>
    );
  }
////////////// redux /////////////////////

  return (
    <div className="pb-16">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-4 sm:px-6">
        {data.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              {product.discountPercentage > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{Math.round(product.discountPercentage)}%
                </span>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-medium text-gray-900 line-clamp-1 mb-1">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.discountPercentage > 0 && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex items-center text-sm">
                  <FiStar className="text-yellow-400 mr-1" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs text-gray-400 capitalize">
                  {product.category.replace(/-/g, ' ')}
                </span>
                {product.stock < 10 && (
                  <span className="text-xs text-orange-500">
                    Only {product.stock} left!
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination - Mobile */}
      <div className="lg:hidden fixed bottom-4 left-0 right-0 bg-white shadow-md p-3 z-10">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <button
            onClick={() => handlePageChange(currentpage - 1)}
            disabled={currentpage === 1}
            className={`flex items-center px-4 py-2 rounded-full ${currentpage === 1 ? 'text-gray-400' : 'text-black'}`}
          >
            <FiChevronLeft className="mr-1" />
            Prev
          </button>

          <div className="text-sm">
            Page {currentpage} of {totalPages}
          </div>

          <button
            onClick={() => handlePageChange(currentpage + 1)}
            disabled={currentpage === totalPages}
            className={`flex items-center px-4 py-2 rounded-full ${currentpage === totalPages ? 'text-gray-400' : 'text-black'}`}
          >
            Next
            <FiChevronRight className="ml-1" />
          </button>
        </div>
      </div>

      {/* Pagination - Desktop */}
      <div className="hidden lg:flex justify-center mt-8 px-4">
        <nav className="inline-flex rounded-md shadow">
          <button
            onClick={() => handlePageChange(currentpage - 1)}
            disabled={currentpage === 1}
            className={`px-3 py-2 rounded-l-md border ${currentpage === 1 ? 'bg-gray-100 text-gray-400 border-gray-300' : 'bg-white text-black border-gray-300 hover:bg-gray-50'}`}
          >
            <FiChevronLeft />
          </button>

          {getPaginationButtons().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 border-t border-b ${page === currentpage ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:bg-gray-50'}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentpage + 1)}
            disabled={currentpage === totalPages}
            className={`px-3 py-2 rounded-r-md border ${currentpage === totalPages ? 'bg-gray-100 text-gray-400 border-gray-300' : 'bg-white text-black border-gray-300 hover:bg-gray-50'}`}
          >
            <FiChevronRight />
          </button>
        </nav>
      </div>
    </div>
  );
}