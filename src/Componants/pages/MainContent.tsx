import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/Store";
import { useEffect, useState } from "react";
import { LuTally3 } from "react-icons/lu";
import { useProducts } from "../../assets/Customs/FetchData";
import Card from "./Card";
import Sidepar from "./SidePar";
import FollowersList from "./Topsellers";
import { Link } from "react-router-dom";
import type { Product } from "../../assets/Customs/FetchData";

export default function MainContent() {
  const { search, selectedCategory, minprice, maxprice, keywords } =
    useSelector((state: RootState) => state.search);

  const [filter, setfilter] = useState("all");
  const [currentpage, setcurrentPage] = useState(1);
  const [dropDown, setDropDown] = useState(false);
  const itemsPerPage = 12;

  const { data, isLoading, error } = useProducts(
    currentpage,
    itemsPerPage,
    keywords
  );

  useEffect(() => {
    console.log("Fetched data:", data);
  }, [currentpage, itemsPerPage, keywords, data]);

  function filterProducts(
    products: Product[] = [],
    selectedCategory: string,
    minprice: number | undefined,
    maxprice: number | undefined,
    filter: string,
    search: string,
    keywords?: string
  ): Product[] {
    let filtered = [...products];

    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (minprice !== undefined && !isNaN(minprice)) {
      filtered = filtered.filter((item) => item.price >= minprice);
    }

    if (maxprice !== undefined && !isNaN(maxprice)) {
      filtered = filtered.filter((item) => item.price <= maxprice);
    }

    if (search?.trim()) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (keywords?.trim()) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(keywords.toLowerCase())
      );
    }

    if (filter === "cheap") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filter === "expensive") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filter === "popular") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return filtered;
  }

  useEffect(() => {
    setcurrentPage(1);
  }, [search, selectedCategory, minprice, maxprice, keywords, filter]);

  const filteredData = filterProducts(
    data?.products || [],
    selectedCategory,
    minprice,
    maxprice,
    filter,
    search,
    keywords
  );

  return (
    <>
      <Sidepar />

      <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] pl-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5 mb-3">
          <div className="relative flex justify-between flex-row w-full">
            <button
              className="border px-4 py-2 rounded flex flex-row items-center cursor-pointer border-gray-400"
              onClick={() => setDropDown(!dropDown)}
            >
              <LuTally3 className="text-black cursor-pointer mr-2" />
              {filter === "all" ? "Filter" : filter}
            </button>

            {dropDown && (
              <div className="absolute bg-white border border-gray-200 rounded mt-2 z-10">
                <button
                  onClick={() => setfilter("cheap")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setfilter("expensive")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setfilter("popular")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  Popular
                </button>
              </div>
            )}

            <div className="flex justify-end pr-7">
              <Link to="/add">
                <button className="cursor-pointer border rounded border-black/12 w-20 h-10 z-10">
                  Cart 🛒
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : filteredData.length > 0 ? (
            <Card
              data={filteredData}
              isloading={isLoading}
              error={null}
              itemsPerPage={itemsPerPage}
              currentpage={currentpage}
              setcurrentPage={setcurrentPage}
            />
          ) : (
            <div>No products found.</div>
          )}
        </div>
      </section>

      <div>
        <FollowersList />
      </div>
    </>
  );
}
