import { fetchGet, fetchPost } from "@/axios";
const reguser = {
  register(data) {
    return fetchPost(`/reguser`, data);
  },
};
export default reguser;
