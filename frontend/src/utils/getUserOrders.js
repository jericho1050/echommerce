async function getUserOrders(token) {
     const response = await fetch(`${import.meta.env.VITE_REST_API_URL}/api/orders/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return await response.json();
  }

export default getUserOrders;