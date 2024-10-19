import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import getUserOrders from "../utils/getUserOrders";
import { useLoaderData } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

export async function loader() {
  const token = localStorage.getItem("token");
  return await getUserOrders(token);
}

export default function Account() {
  const orders = useLoaderData();
  console.log(orders);
  return (
    <Box component={"section"}>
      <Typography variant="h1" gutterBottom>
        Your orders
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Order date</TableCell>
              <TableCell>Delivery status</TableCell>
              <TableCell>Payment status</TableCell>
              <TableCell>Total PRICE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...orders].reverse().map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.order_id}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{formatDate(order.order_date)}</TableCell>
                <TableCell>{order.delivery_status}</TableCell>
                <TableCell>{order.payment_status}</TableCell>
                <TableCell>${order.total_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
