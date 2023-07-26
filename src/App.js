import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductItem from "./components/UI/ProductItem";
import {
  setPhones,
  updateCount,
  // deletePhone,
} from "./components/store/PhonesSlice";
import LoadingSpinner from "./components/spinners/LoadingSpinner";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const phones = useSelector((state) => state.phones.items);
  const count = useSelector((state) => state.phones.count);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPhonesHandler = useCallback(async () => {
    console.log("fetch phones");
    setIsLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();

      const newPhone = data.products.map((phoneData) => ({
        id: phoneData.id,
        thumbnail: phoneData.thumbnail,
        title: phoneData.title,
        description: phoneData.description,
        brand: phoneData.brand,
      }));

      dispatch(setPhones(newPhone));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (phones.length === 0) {
      fetchPhonesHandler();
    }
  }, []);

  const loadMoreHandler = () => {
    dispatch(updateCount(9));
  };

  return (
    <React.Fragment>
      {/*<AddProduct />*/}
      <header className="header">
        <section>
          <button onClick={fetchPhonesHandler}>Fetch products</button>
          <button
            onClick={() => {
              navigate("/product/add");
            }}
          >
            Add product
          </button>
        </section>
      </header>
      <section>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <React.Fragment>
            {phones.length === 0 ? (
              <p>No phones to display</p>
            ) : (
              phones
                .slice(0, count)
                .map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))
            )}
            {count < phones.length && (
              <button onClick={loadMoreHandler}>Load More</button>
            )}
          </React.Fragment>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
