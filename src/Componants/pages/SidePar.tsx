import { useEffect, useState } from "react";
import CustomInput from "../../assets/Customs/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Redux/Store";
import {
  resetfilters,
  setKeywords,
  setMaxPrice,
  setMinPrice,
  setSearch,
  setSelectedCategory,
} from "../../Redux/SearchSlice";
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Sidebar() {
  const [Config, setConfig] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [keywordsOpen, setKeywordsOpen] = useState(true);

  const keywordsList = ["shirt", "watch", "apple", "fashion", "smart"];

  interface Product {
    category: string;
  }
  interface FetchResponse {
    products: Product[];
  }

  const dispatch = useDispatch();
  const { search, selectedCategory, minprice, maxprice } = useSelector(
    (state: RootState) => state.search
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setConfig(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategory = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const handleKeywords = (keyword: string) => {
    dispatch(setKeywords(keyword));
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Mobile filter button */}
      <button 
        onClick={toggleMobileMenu}
        className="lg:hidden fixed bottom-6 right-6 z-30 bg-black text-white p-3 rounded-full shadow-lg flex items-center gap-2"
      >
        <FiFilter size={20} />
        <span>Filters</span>
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:sticky top-0 left-0 z-20
        w-72 h-screen bg-white border-r border-gray-200
        overflow-y-auto transition-transform duration-300
        pt-4 px-4 pb-6
      `}>
        {/* Mobile header */}
        <div className="flex justify-between items-center lg:hidden mb-4">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={toggleMobileMenu} className="p-2">
            <FiX size={24} />
          </button>
        </div>

        {/* Search Section */}
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Search
          </h3>
          <CustomInput
            type="text"
            placeholder="Search products..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
        </section>

        {/* Price Range */}
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Price Range
          </h3>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Min</label>
              <CustomInput
                type="number"
                placeholder="Min"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={minprice}
                onChange={(e) => {
                  const value = e.target.value;
                  const numValue = value === "" ? undefined : Number(value);
                  dispatch(setMinPrice(numValue));
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Max</label>
              <CustomInput
                type="number"
                placeholder="Max"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={maxprice}
                onChange={(e) => {
                  const value = e.target.value;
                  const numValue = value === "" ? undefined : Number(value);
                  dispatch(setMaxPrice(numValue));
                }}
              />
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setCategoriesOpen(!categoriesOpen)}
          >
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Categories
            </h3>
            {categoriesOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          
          {categoriesOpen && (
            <div className="mt-3 space-y-2">
              <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <CustomInput
                  type="radio"
                  value="all"
                  name="category"
                  className="w-4 h-4 text-black accent-black"
                  onChange={() => handleCategory("all")}
                  checked={selectedCategory === "all"}
                />
                <span className="text-sm">All Categories</span>
              </label>
              
              {Config.map((category, index) => (
                <label 
                  key={index}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <CustomInput
                    type="radio"
                    value={category}
                    name="category"
                    className="w-4 h-4 text-black accent-black"
                    onChange={() => handleCategory(category)}
                    checked={selectedCategory === category}
                  />
                  <span className="text-sm capitalize">
                    {category.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                </label>
              ))}
            </div>
          )}
        </section>

        {/* Keywords Section */}
        <section className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setKeywordsOpen(!keywordsOpen)}
          >
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Popular Keywords
            </h3>
            {keywordsOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          
          {keywordsOpen && (
            <div className="mt-3 flex flex-wrap gap-2">
              {keywordsList.map((keyword, idx) => (
                <button
                  key={idx}
                  className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  onClick={() => handleKeywords(keyword)}
                >
                  {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Reset Button */}
        <button
          className="w-full py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          onClick={() => dispatch(resetfilters())}
        >
          Reset All Filters
        </button>
      </div>
    </>
  );
}