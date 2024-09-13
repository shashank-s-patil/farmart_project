

export function setDataInCookie(data){
    let date = new Date();
    date.setFullYear(date.getFullYear()+1);
    document.cookie = `user=${JSON.stringify(data)}; expires=${date}; path='/'`;
}

export function getDataFromCookie(){
    if(document.cookie && document.cookie.split("=").length > 0){
        return JSON.parse(document.cookie.split("=")[1]);
    }
    else{
        return null;
    }

}



