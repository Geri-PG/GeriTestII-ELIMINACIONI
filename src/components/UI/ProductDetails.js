import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import classes from "./ProductDetails.module.css";
import LoadingSpinner from "../spinners/LoadingSpinner";

function ProductDetails(props) {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState({
    id: "",
    title: "",
    description: "",
    brand: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    setIsFetching(true);
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      const productRes = {
        id: data.id,
        thumbnail: data.thumbnail,
        title: data.title,
        description: data.description,
        brand: data.brand,
      };
      setProduct(productRes);
      setIsFetching(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={classes["details-wrapper"]}>
      <h1>Product details</h1>
      <div className={classes["details-container"]}>
        {isFetching ? (
          <LoadingSpinner />
        ) : (
          <React.Fragment>
            <header>
              <h4 className={classes.title}>Image:</h4>
              <img
                className={classes.thumbnail}
                src={product.thumbnail}
                alt="Thumbnail"
              />
            </header>
            <main>
              <h4 className={classes.title}>Title:</h4>
              <p>{product.title}</p>
              <h4 className={classes.title}>Description:</h4>
              <p>{product.description}</p>
              <h4 className={classes.title}>Brand:</h4>
              <p>{product.brand}</p>
            </main>
            <footer className={classes.footer}>
              <button
                onClick={() => {
                  navigate(-1);
                }}
              >
                Go back
              </button>
            </footer>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
