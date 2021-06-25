import { GET_BAR_CODES, BAR_CODE_LOADING, DELETE_BAR_CODE, UPLOAD_BARCODE } from "../actions/BarCodeActions";

const initialState = {
  totalItems: 0,
  totalPages: 0,
  currentPage: 0,
  barCodeList: [],
  barcodeRes: {},
  loading: false,
  message: null,
  severity: "error"
};

const BarcodeReducer = function (state = initialState, action) {
  switch (action.type) {
    case BAR_CODE_LOADING: {
      return {
        ...state,
        barCodeList: []
      };
    }
    case GET_BAR_CODES: {
      return {
        ...state,
        loading: false,
        barCodeList: [...action.payload.items],
        totalItems: action.payload.totalItems || 0,
        totalPages: action.payload.totalPages || 0,
        currentPage: action.payload.currentPage || 0
      };
    }
    case DELETE_BAR_CODE: {
      return {
        ...state,
        message: action.message,
        severity: action.severity
      };
    }
    case UPLOAD_BARCODE: {
      return {
        ...state,
        message: action.message,
        severity: action.severity,
        barcodeRes: action.barcodeRes
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default BarcodeReducer;
