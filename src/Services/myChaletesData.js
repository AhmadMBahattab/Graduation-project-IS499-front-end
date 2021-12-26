import http from "../Services/httpService";

const EndPoint = "http://localhost:5000/myChalets/myChaletsPage";
export function getMyChalets() {
  return http.get(EndPoint);
}

export function saveChalet(post) {
  if (post._id) {
    const body = { ...post };
    delete body._id;
    http.put(EndPoint + "/" + post._id, body);
  }

  return http.post(EndPoint, post);
}

export function deletePost(postId) {
  return http.delete(EndPoint + "/" + postId);
}
