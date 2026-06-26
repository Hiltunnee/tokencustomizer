export async function sendOrder(orderName, orderData) {
  const formData = new FormData();

  console.log("Order data to send:", orderData);
  console.log("Order name to send:", orderName);

  formData.append(
    "access_key",
    "1c8f7391-5c80-4c9d-a53c-e1379233c1c2"
  );

  formData.append("subject", `Uusi tilaus: ${orderName}`);

  formData.append(
    "message", 
    `Tilaustunniste: ${orderName}. 
    
    Tilaustiedot: 
    ${orderData}`);

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });

  return await res.json();
}
