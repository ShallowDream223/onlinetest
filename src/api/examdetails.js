import axios from "axios";

export function textFunApi(){
    return axios.get('/text/text')
}