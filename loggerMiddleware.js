import { createStore, combineReducers, applyMiddleware } from "redux";
import pkg from "redux-logger"; // default import
const { createLogger } = pkg; // destructure named export
const ORDER_PIZZA = "order-pizza";
const ORDER_BURGER = "order-burger";

//The logger middleware
const logger = createLogger();

const pizzaOrder = {
  type: ORDER_PIZZA,
};

const burgerOrder = {
  type: ORDER_BURGER,
};

//Action cerators
function orderPizza() {
  return pizzaOrder;
}

function orderBurger() {
  return burgerOrder;
}

//initial state for pizza
const initialStatePizza = {
  pizzaBase: 100,
};

//intial state for burger
const initialStateBurger = {
  burger_Buns: 200,
};

//Reducer for pizza
const PizzaReducer = (state = initialStatePizza, action) => {
  switch (action.type) {
    case ORDER_PIZZA:
      return {
        ...state,
        pizzaBase: state.pizzaBase - 1,
      };
    default:
      return state;
  }
};

//Reducer for burger
const BurgerReducer = (state = initialStateBurger, action) => {
  switch (action.type) {
    case ORDER_BURGER:
      return {
        ...state,
        burger_Buns: state.burger_Buns - 1,
      };
    default:
      return state;
  }
};

//combined reducer function exported from redux
const rootReducer = combineReducers({
  pizza: PizzaReducer,
  burger: BurgerReducer,
});

//Store

//1- Store needs to holds RootReducer Function and Logger
const store = createStore(rootReducer, applyMiddleware(logger)); //further middlewares can be added after logger with a separation of coma.

//2- its exposes an method called getSatte which gives you acess to the current state in the store
// console.log("Initial state : ",store.getState());

//3- Registers listerners Via Subscribe (listeners) [works wyhen there is an update on the state]
const unsubscribe = store.subscribe(() => {});

//4- Allows state to be updated via Dispatch
store.dispatch(orderPizza());
store.dispatch(orderPizza());
store.dispatch(orderPizza());
store.dispatch(orderBurger());
store.dispatch(orderBurger());
store.dispatch(orderBurger());
unsubscribe();
