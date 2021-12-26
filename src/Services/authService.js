import http from "../Services/httpService";
import jwtDecode from "jwt-decode";

const apiEndPoint = "http://localhost:5000/login";
const tokenKey = "token";

export async function login(email, password) {
  return await http.post(apiEndPoint, { email, password });
}
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}
export function getCurrentUser() {
  try {
    let jwt = localStorage.getItem(tokenKey);
    let user = jwtDecode(jwt);
    console.log(user);
    this.setState({ user });
  } catch (error) {
    console.log("no token save in the browser ");
  }
}
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
};
