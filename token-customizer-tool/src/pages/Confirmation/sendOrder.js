export async function sendOrder(orderName, orderData) {
  const formData = new FormData();
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

  formData.append(
    "access_key",
    accessKey
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
