import {  useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../slices/auth";
import { openSnackbar } from "../../slices/snackbar";
// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function PaymentDialog({ productId, quantity, price }) {
  const dispatch = useDispatch();
  const { token } = useSelector(authSelector);
  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    "enable-funding": "venmo",
    "buyer-country": "US",
    currency: "USD",
    components: "buttons",
  };
  const [message, setMessage] = useState("");
  return (
    <div className="paypal-button-container">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "pill",
            layout: "vertical",
            color: "silver",
            label: "buynow",
          }}
          createOrder={async () => {
            try {
              const product = {
                id: productId,
                quantity: quantity,
                price: price,
              };
              const response = await fetch(
                `${import.meta.env.VITE_REST_API_URL}/api/orders/`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                  },

                  // use the "body" param to optionally pass additional  order information
                  // like product ids and quantities
                  body: JSON.stringify({
                    order: product,
                  }),
                }
              );
              const data = await response.json();
              const orderData = JSON.parse(data);
              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error(error);
              setMessage(`Could not initiate PayPal Checkout...${error}`);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await fetch(
                `${import.meta.env.VITE_REST_API_URL}/api/orders/${
                  data.orderID
                }/capture/`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                  },
                  body: JSON.stringify({
                    productId: productId,
                  }),
                }
              );

              const text = await response.json();
              const orderData = JSON.parse(text);
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                // setMessage(
                //   `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                // );
                dispatch(openSnackbar({ status: "success", id: transaction.id }));
              }
            } catch (error) {
              console.error(error);
              setMessage(
                `Sorry, your transaction could not be processed...${error}`
              );
            }
          }}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

export default PaymentDialog;
