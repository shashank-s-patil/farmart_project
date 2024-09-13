
// import createStore from redux
import { createStore } from "redux";


// create store variable
export const store = createStore(reducer);

// create reducer function -> this maintain state
function reducer(state, action) {
    switch(action.type){
        case "userdata":
            return {...state, user: action.data}
    }
}













