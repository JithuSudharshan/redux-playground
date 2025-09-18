import axios from "axios";//importing axios for API calls
import { createStore,applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // importing thunk middleware
const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

//initial state
const initialState = {
  loading: false,
  products: [],
  error: false,
};

//Action creators
function fetchRequest() {
  return {
    type: FETCH_REQUEST,
  };
}
function fetchSucess(products) {
  return {
    type: FETCH_SUCCESS,
    payload: products,
  };
}

function fetchError() {
  return {
    type: FETCH_ERROR,
  };
}

//Reducer
const reducer=(state = initialState, action)=>{
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading:true
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        loading:false,
        products:action.payload
      }
     case FETCH_ERROR:
      return {
        ...state,
        loading:false,
        error:true

      } 
    default:
      return state;
  }
}

//Thunk Action Creator
const fetchProducts=()=>{
  return function(dispatch){
    dispatch(fetchRequest());
    axios.get('https://fakestoreapi.com/products')
    .then(res=>{
      const products=res.data.map(pd=>pd.title);
      dispatch(fetchSucess(products));
    })
    .catch(err=>{
      dispatch(fetchError())
    })
  }
}

//store
const store = createStore(reducer,applyMiddleware(thunk)); 

//subscribing to the store
store.subscribe(()=>console.log(store.getState()));

//dispatching the Thunk ACtion creator
store.dispatch(fetchProducts());