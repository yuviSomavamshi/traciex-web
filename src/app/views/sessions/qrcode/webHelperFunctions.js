import { webConstants } from "./webConstants";
import { base } from "../../../Constants";
import moment from "moment";
import io from "socket.io-client";

var socket = null;

export const getTimeInFormat = (time) => {
  if (time === "") {
    return "";
  }
  const newTime = moment(time).format(webConstants.TIME_FORMAT);
  return newTime;
};

export const getDateTimeInFormat = (time) => {
  if (time === "") {
    return "";
  }
  const newTime = moment(time).format(webConstants.DATE_TIME_FORMAT);
  return newTime;
};

export const getUniqueId = () => {
  const id = JSON.stringify(Date.now());
  console.log("UNIQUE ID => ", id);
  return id;
};

export const storeLocalData = async (key, value) => {
  try {
    await localStorage.setItem(key, value);
  } catch (e) {
    console.log("AsyncStorage Error", e);
  }
};

export async function clearLocalData() {
  try {
    await localStorage.clear();
  } catch (e) {
    console.log("AsyncStorage Error", e);
  }
}

export const getLocalData = (key) => {
  let value = "";
  try {
    value = localStorage.getItem(key);
  } catch (e) {
    console.log("AsyncStorage Error", e);
  }
  return value;
};

export const getUserType = (item) => {
  let userId = getLocalData(webConstants.USER_ID);
  if (item.userId === userId) {
    return webConstants.OWNER;
  } else if (item.chatId === userId) {
    return webConstants.FRIEND;
  }
};

export const getUserTypeChatRoom = (item, userId) => {
  if (item.userId === userId) {
    return webConstants.OWNER;
  } else if (item.chatId === userId) {
    return webConstants.FRIEND;
  }
};

export function getSocket() {
  debugger;
  if (socket == null) {
    socket = io.connect(base, { transports: ["websocket"] });
    console.log(socket);
  }
  return socket;
}

export const getDateTimeStatusFormat = (time) => {
  if (time === "") {
    return "";
  }
  return `Last update ${getDateTimeInFormat(time)}`;
};
