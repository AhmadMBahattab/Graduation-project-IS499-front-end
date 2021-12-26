import http from "../Services/httpService";

const EndPoint = "http://localhost:5000/home";

export function getAllChalets() {
  return http.get(EndPoint);
}
