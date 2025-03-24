import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  const response = await fetch("api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      credentials: "include",
    },
    body: JSON.stringify(userInfo),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export { login };
