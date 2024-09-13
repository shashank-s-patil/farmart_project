import { postData } from "./context.service";

const url = "http://localhost:5000/checkSeller/";

export function checkSeller(data, options){
    return postData(url, data, options);
}











