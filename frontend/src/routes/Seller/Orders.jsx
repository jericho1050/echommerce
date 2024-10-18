import { Datagrid, DateField, List, NumberField, ReferenceField, TextField } from 'react-admin';

export const OrderList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="product" reference="products">
                <TextField source="name" />
            </ReferenceField>
            <NumberField source="quantity" />
            <TextField source="payment_status" />
            <TextField source="delivery_status" />
            <ReferenceField source="buyer" reference="users">
                <TextField source="first_name" />
                {" "}
                <TextField source="last_name" />
            </ReferenceField>
        </Datagrid>
    </List>
);