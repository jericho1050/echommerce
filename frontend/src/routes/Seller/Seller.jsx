import { Admin, ListGuesser, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import { ProductList } from "./Products";

export default function SellerDashboard() {
    return (
        <Admin basename="/seller" dataProvider={dataProvider}>
            <Resource name="products" list={ProductList} />
        </Admin>
    );
}