import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import NotificationReducer from "./NotificationReducer";
import EcommerceReducer from "./EcommerceReducer";
import CustomerReducer from "./CustomerReducer";
import DashboardReducer from "./DashboardReducer";
import BarCodeReducer from "./BarCodeReducer";
import RamanReaderReducer from "./RamanReaderReducer";

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer,
  customers: CustomerReducer,
  dashboard: DashboardReducer,
  barCode: BarCodeReducer,
  ramanReader: RamanReaderReducer
});

export default RootReducer;
