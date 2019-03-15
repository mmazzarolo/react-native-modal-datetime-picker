import { StyleSheet, Dimensions, Platform } from "react-native";

export const isIphoneX = () => {
  const { height, width } = Dimensions.get("window");

  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812 || (height === 896 || width === 896))
  );
};

const BORDER_RADIUS = 13;
const BACKGROUND_COLOR = "white";
const BORDER_COLOR = "#d5d5d5";
const TITLE_FONT_SIZE = 13;
const TITLE_COLOR = "#8f8f8f";
const BUTTON_FONT_WEIGHT = "normal";
const BUTTON_FONT_COLOR = "#007ff9";
const BUTTON_FONT_SIZE = 20;

export default StyleSheet.create({
  contentContainer: {
    justifyContent: "flex-end",
    margin: 10
  },
  datepickerContainer: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS,
    marginBottom: 8,
    overflow: "hidden"
  },
  titleContainer: {
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 14,
    backgroundColor: "transparent"
  },
  title: {
    textAlign: "center",
    color: TITLE_COLOR,
    fontSize: TITLE_FONT_SIZE
  },
  confirmButton: {
    borderColor: BORDER_COLOR,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: "transparent",
    height: 57,
    justifyContent: "center"
  },
  confirmText: {
    textAlign: "center",
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: BUTTON_FONT_WEIGHT,
    backgroundColor: "transparent"
  },
  cancelButton: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS,
    height: 57,
    marginBottom: isIphoneX() ? 20 : 0,
    justifyContent: "center"
  },
  cancelText: {
    padding: 10,
    textAlign: "center",
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: "600",
    backgroundColor: "transparent"
  }
});
