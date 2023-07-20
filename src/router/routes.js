import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import AddProduct from "../components/UI/AddProduct";
import EditProduct from "../components/UI/EditProduct";
import ProductDetails from "../components/UI/ProductDetails";

export default createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "/product/:id",
        element: <ProductDetails />
    },
    {
        path: "/product/add",
        element: <AddProduct />
    },
    {
        path: "/product/edit/:id",
        element: <EditProduct />
    },
]);
