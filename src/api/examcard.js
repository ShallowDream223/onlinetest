import { fetchGet, fetchPost } from "@/axios";
// const examCard = function (data) {
//   return fetchPost(`/examcard`, data);
// };
const examCard = function (data) {
  return fetchPost("/examcard", data);
};

export default examCard;
