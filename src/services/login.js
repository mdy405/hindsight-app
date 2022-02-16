import fetch from "node-fetch";

export default async function sendLogin(email, password, otp) {
  let url = process.env.REACT_APP_ENDPOINT_LOGIN + "/api/auth/login";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      otp,
    }),
  });
}
