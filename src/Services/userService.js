import http from "../Services/httpService";

const apiEndPoint = "http://localhost:5000/register";

export function registerUser(user) {
  return http.post(apiEndPoint, {
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    email: user.email,
    email2: user.email2,
    phoneNumber: user.phoneNumber,
    password: user.password,
    password2: user.password2,
  });
}
