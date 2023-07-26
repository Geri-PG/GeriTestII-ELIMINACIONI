import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePhone } from "../store/PhonesSlice";
import classes from "./EditProduct.module.css";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../spinners/LoadingSpinner";
import FormInput from "../form/FormInput";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isFetching, setIsFetching] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [editProduct, setEditProduct] = useState({
    id: "",
    title: "",
    description: "",
    brand: "",
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  function validateInputs() {
    const validationErrorsCopy = { ...validationErrors };
    let isValid = true;
    if (!editProduct.title) {
      validationErrorsCopy.title = { messages: ["Title cannot be empty"] };
      isValid = false;
    } else {
      validationErrorsCopy.title = {};
    }
    if (!editProduct.description) {
      validationErrorsCopy.description = {
        messages: ["Description cannot be empty"],
      };
      isValid = false;
    } else {
      validationErrorsCopy.description = {};
    }
    if (!editProduct.brand) {
      validationErrorsCopy.brand = {
        messages: ["Brand cannot be empty"],
      };
      isValid = false;
    } else {
      validationErrorsCopy.brand = {};
    }

    setValidationErrors(validationErrorsCopy);

    return isValid;
  }

  async function fetchProduct() {
    setIsFetching(true);
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      const product = {
        id: data.id,
        thumbnail: data.thumbnail,
        title: data.title,
        description: data.description,
        brand: data.brand,
      };
      setEditProduct(product);
    } catch (e) {
      console.log(e);
      setIsFetching(false);
    } finally {
      setIsFetching(false);
    }
  }

  const dispatch = useDispatch();

  const inputChangeHandler = (event) => {
    const { name, value } = event.target || event;
    setEditProduct({
      ...editProduct,
      [name]: value,
    });
  };

  const updateProductHandler = () => {
    const validated = validateInputs();

    if (validated) {
      fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editProduct.title,
          description: editProduct.description,
          brand: editProduct.brand,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          dispatch(updatePhone(editProduct));
          navigate("/");
        })
        .catch((error) => console.log("An error occurred", error));
    }
  };

  return (
    <div className={classes["edit-product-container"]}>
      <h1>Edit product</h1>
      <div className={classes["form-container"]}>
        <div>
          {isFetching ? (
            <LoadingSpinner />
          ) : (
            <React.Fragment>
              <header>
                <h4 className={classes.title}>Image:</h4>
                <img
                  className={classes.thumbnail}
                  src={editProduct.thumbnail}
                  alt="Thumbnail"
                />
              </header>
              <FormInput
                title="Title"
                placeholder="Product Title"
                validationErrors={validationErrors.title?.messages || []}
                value={editProduct.title}
                onChange={(value) =>
                  inputChangeHandler({ name: "title", value })
                }
              />
              <FormInput
                title="Description"
                placeholder="Product Description"
                validationErrors={validationErrors.description?.messages || []}
                value={editProduct.description}
                onChange={(value) =>
                  inputChangeHandler({ name: "description", value })
                }
              />
              <FormInput
                title="Brand"
                placeholder="Product Brand"
                validationErrors={validationErrors.brand?.messages || []}
                value={editProduct.brand}
                onChange={(value) =>
                  inputChangeHandler({ name: "brand", value })
                }
              />
              <footer className={classes["actions"]}>
                <button
                  className={classes["form-button"]}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Cancel
                </button>
                <button
                  className={classes["form-button"]}
                  onClick={updateProductHandler}
                >
                  Update
                </button>
              </footer>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
