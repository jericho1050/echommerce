// Seller.jsx
import { Admin, EditGuesser, ListGuesser, Resource, ShowGuesser } from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { ProductCreate, ProductEdit, ProductList, ProductShow } from "./Products";
import CustomLoginPage from './CustomLoginPage';
import { OrderList } from "./Orders";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
export default function SellerDashboard() {
    return (
        <Admin
            basename="/seller"
            authProvider={authProvider}
            dataProvider={dataProvider}
            loginPage={CustomLoginPage}
        >
            <Resource name="products" list={ProductList} show={ProductShow} edit={ProductEdit} create={ProductCreate} icon={Inventory2Icon}/>
            <Resource name="orders" list={OrderList} show={ShowGuesser} icon={ReceiptLongIcon}/>
        </Admin>
    );
}