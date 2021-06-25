import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOADING,
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
  RESETNEW_PASSWORD,
  RESETNEW_PASSWORD_ERROR,
  OTPVERIFY_EMAIL,
  OTPVERIFY_EMAIL_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR
} from "../actions/LoginActions";

const initialState = {
  success: false,
  loading: false,
  error: "",
  loginRole: "Admin",
  message: null,
  otpSuccess: null,
  resetSuccess: null,
  changepwdSuccess: null
};

const LoginReducer = function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
        success: false,
        message: null,
        otpSuccess: null,
        resetSuccess: null,
        changepwdSuccess: null
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        success: true,
        loading: false,
        loginRole: action.loginRole
      };
    }
    case RESET_PASSWORD: {
      return {
        ...state,
        success: true,
        loading: false,
        message: action.payload.message
      };
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        success: false,
        loading: false,
        message: action.payload.message
      };
    }
    case RESETNEW_PASSWORD: {
      return {
        ...state,
        resetSuccess: true,
        loading: false,
        message: action.payload.message
      };
    }
    case RESETNEW_PASSWORD_ERROR: {
      return {
        ...state,
        resetSuccess: false,
        loading: false,
        message: action.payload.message
      };
    }
    case OTPVERIFY_EMAIL: {
      return {
        ...state,
        otpSuccess: true,
        loading: false,
        message: action.payload.message
      };
    }
    case OTPVERIFY_EMAIL_ERROR: {
      return {
        ...state,
        otpSuccess: false,
        loading: false,
        message: action.payload.message
      };
    }
    case CHANGE_PASSWORD: {
      return {
        ...state,
        changepwdSuccess: true,
        loading: false,
        message: action.payload.message
      };
    }
    case CHANGE_PASSWORD_ERROR: {
      return {
        ...state,
        changepwdSuccess: false,
        loading: false,
        message: action.payload.message
      };
    }
    case LOGIN_ERROR: {
      return {
        success: false,
        loading: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default LoginReducer;
