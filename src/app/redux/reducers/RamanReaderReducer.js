import { GET_RAMANREADER_CODES, RAMANREADER_CODE_LOADING, DELETE_RAMANREADER_CODE, UPLOAD_RAMANREADER } from "../actions/RamanReaderActions";

const initialState = {
  totalItems: 0,
  totalPages: 0,
  currentPage: 0,
  ramanreaderCodeList: [],
  loading: false,
  message: null,
  severity: "error"
};

const RamanReaderReducer = function (state = initialState, action) {
  switch (action.type) {
    case RAMANREADER_CODE_LOADING: {
      return {
        ...state,
        ramanreaderCodeList: []
      };
    }
    case GET_RAMANREADER_CODES: {
      return {
        ...state,
        loading: false,
        ramanreaderCodeList: [...action.payload.items],
        totalItems: action.payload.totalItems || 0,
        totalPages: action.payload.totalPages || 0,
        currentPage: action.payload.currentPage || 0
      };
    }
    case DELETE_RAMANREADER_CODE: {
      return {
        ...state,
        message: action.message,
        severity: action.severity
      };
    }
    case UPLOAD_RAMANREADER: {
      return {
        ...state,
        message: action.message,
        severity: action.severity,
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default RamanReaderReducer;
