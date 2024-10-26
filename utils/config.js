import { Dimensions } from "react-native";
import * as Clipboard from "expo-clipboard";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export const white = "#ffffff";
export const black = "#000000";
export const inputgrey = "#a9a9a9";

export const copyToClipboard = async (value) => {
    await Clipboard.setStringAsync(value);
  };