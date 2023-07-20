import AddProduct from "./components/UI/AddProduct";
import App from "./App";
import Store from "./components/store/Store";
import {Provider} from "react-redux";

function Root() {
    return (
        <Provider store={Store}>
            <App />
        </Provider>
    )
}

export default Root;
