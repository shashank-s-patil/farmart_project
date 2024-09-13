import { postData } from "./context.service";

const url = "http://localhost:5000/checkUser/";

export function checkUser(data, options){
    return postData(url, data, options);
}











