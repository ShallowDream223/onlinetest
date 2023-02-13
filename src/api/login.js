import { fetchGet, fetchPost } from "@/axios";
const login = {
  login(data) {
    return fetchPost(`/login`, data);
  },
};
export default login;
