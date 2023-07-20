import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPhone } from "../store/PhonesSlice";
import classes from "./AddProduct.module.css";
import { useNavigate } from "react-router-dom";
import FormInput from "../form/FormInput";

const AddProduct = () => {
  const navigate = useNavigate();
  const emptyProduct = {
    id: "",
    title: "",
    description: "",
    brand: "",
  };
  const [validationErrors, setValidationErrors] = useState({});
  const [newProduct, setNewProduct] = useState(emptyProduct);

  const dispatch = useDispatch();

  const inputChangeHandler = (event) => {
    const { name, value } = event.target || event;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const addProductHandler = () => {
    const validated = validateInputs();

    if (validated) {
      fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newProduct.title,
          description: newProduct.description,
          brand: newProduct.brand,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        dispatch(addPhone(newProduct));
        setNewProduct(emptyProduct);
        navigate('/');
      });
    }
  };

  function validateInputs () {
    const validationErrorsCopy = {...validationErrors}
    let isValid = true;
    if (!newProduct.title) {
      validationErrorsCopy.title = {messages: ['Title cannot be empty']};
      isValid = false;
    } else {
      validationErrorsCopy.title = {};
    }
    if (!newProduct.description) {
      validationErrorsCopy.description = {messages: ['Description cannot be empty']};
      isValid = false;
    } else {
      validationErrorsCopy.description = {};
    }
    if (!newProduct.brand) {
      validationErrorsCopy.brand = {
        messages: ['Brand cannot be empty']
      };
      isValid = false;
    } else {
      validationErrorsCopy.brand = {};
    }

    setValidationErrors(validationErrorsCopy);

    return isValid;
  }

  return (
    <div className={classes['add-product-container']}>
      <h1>Add product</h1>
      <div className={classes["form-container"]}>
        <FormInput
            title="Title"
            placeholder="Product Title"
            validationErrors={validationErrors.title?.messages || []}
            onChange={value => (inputChangeHandler({ name: 'title', value }))}
        />
        <FormInput
            title="Description"
            placeholder="Product Description"
            validationErrors={validationErrors.description?.messages || []}
            onChange={value => (inputChangeHandler({ name: 'description', value }))}
        />
        <FormInput
            title="Brand"
            placeholder="Product Brand"
            validationErrors={validationErrors.brand?.messages || []}
            onChange={value => (inputChangeHandler({ name: 'brand', value }))}
        />
        <footer className={classes['actions']}>
          <button className={classes["form-button"]} onClick={() => { navigate(-1) }}>
            Cancel
          </button>
          <button className={classes["form-button"]} onClick={addProductHandler}>
            Add
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AddProduct;
