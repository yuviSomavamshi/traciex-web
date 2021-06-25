import { GET_CUSTOMER_LIST, ADD_CUSTOMER, DELETE_CUSTOMER, UPDATE_CUSTOMER, ADD_CUSTOMER_LOC } from "../actions/CustomerActions";

const initialState = {
  totalItems: 0,
  totalPages: 0,
  currentPage: 0,
  customerList: [],
  message: null,
  severity: "error"
};

const CustomerReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOMER_LIST: {
      return {
        ...state,
        customerList: [...action.payload.items],
        totalItems: action.payload.totalItems || 0,
        totalPages: action.payload.totalPages || 0,
        currentPage: action.payload.currentPage || 0
      };
    }
    case ADD_CUSTOMER: {
      return {
        ...state,
        message: action.message,
        severity: action.severity
      };
    }
    case ADD_CUSTOMER_LOC: {
      return {
        ...state,
        customerLoc: action.payload
      };
    }
    case DELETE_CUSTOMER: {
      return {
        ...state,
        customerList: [...action.payload]
      };
    }
    case UPDATE_CUSTOMER: {
      return {
        ...state,
        cartList: [...action.payload]
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default CustomerReducer;
