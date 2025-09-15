
import { createStore } from "redux" 
const ORDER_PIZZA = "order-pizza"

const action = {
    type:ORDER_PIZZA,
    topping:["cherry","dryFruits","iceCream"]
}

//Action cerator
function actionCreator(){
    return action
}

//setting the initial state
const initialState = {
    pizzaBase:100
}

//Reducer
const reducer =(state=initialState,action)=>{
    switch (action.type) {
        case ORDER_PIZZA:
            return {
                ...state,
                pizzaBase:state.pizzaBase-1
            }
    
        default: 
        return state
    }
}

//Store
//1- Store needs to hold Reducer Function
const store = createStore(reducer);

//2- its exposes an method called getSatte which gives you acess to the current state in the store
console.log("Initial state : ",store.getState());

//3- Registers listerners Via Subscribe (listeners) [works wyhen there is an update on the state]
const unsubscribe=store.subscribe(()=>(console.log("Updated state: ",store.getState())))

//4- Allows state to be updated via Dispatch
store.dispatch(actionCreator());
store.dispatch(actionCreator());
store.dispatch(actionCreator());
store.dispatch(actionCreator());
store.dispatch(actionCreator());
store.dispatch(actionCreator());
store.dispatch(actionCreator());
store.dispatch(actionCreator());
unsubscribe();
store.dispatch(actionCreator());


