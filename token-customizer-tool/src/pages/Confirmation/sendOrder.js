export async function sendOrder(orderName, orderData) {
  const formData = new FormData();

  formData.append(
    "access_key",
    "1c8f7391-5c80-4c9d-a53c-e1379233c1c2"
  );

  formData.append("subject", `Uusi tilaus: ${orderName}`);

  formData.append(
    "tilaustunniste",
    JSON.stringify(orderName, null, 2)
  );

  formData.append(
    "order details",
    JSON.stringify(orderData, null, 2)
  );

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });

  return await res.json();
}