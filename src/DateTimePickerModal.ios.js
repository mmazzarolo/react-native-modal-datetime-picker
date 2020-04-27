import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "./Modal";
import { isIphoneX } from "./utils";

export const BORDER_RADIUS = 13;
export const BACKGROUND_COLOR_LIGHT = "white";
export const BACKGROUND_COLOR_DARK = "#0E0E0E";
export const BORDER_COLOR = "#d5d5d5";
export const TITLE_FONT_SIZE = 20;
export const TITLE_COLOR = "#8f8f8f";
export const BUTTON_FONT_WEIGHT = "normal";
export const BUTTON_FONT_COLOR = "#007ff9";
export const BUTTON_FONT_SIZE = 20;
export const HIGHLIGHT_COLOR_LIGHT = "#ebebeb";
export const HIGHLIGHT_COLOR_DARK = "#444444";

const deprecatedPropsInfo = [
  { prop: "titleIOS", newProp: "headerTextIOS" },
  { prop: "customTitleContainerIOS", newProp: "customHeaderIOS" },
  { prop: "onHideAfterConfirm", newProp: "onHide" },
  { prop: "customDatePickerIOS", newProp: "customPickerIOS" },
];

const unsopportedPropsInfo = [
  { prop: "cancelTextStyle" },
  { prop: "confirmTextStyle" },
  { prop: "datePickerModeAndroid" },
  { prop: "dismissOnBackdropPressIOS" },
  { prop: "hideTitleContainerIOS" },
  { prop: "neverDisableConfirmIOS" },
  { prop: "pickerRefCb" },
  { prop: "reactNativeModalPropsIOS" },
];

export class DateTimePickerModal extends React.PureComponent {
  static propTypes = {
    cancelTextIOS: PropTypes.string,
    confirmTextIOS: PropTypes.string,
    customCancelButtonIOS: PropTypes.elementType,
    customConfirmButtonIOS: PropTypes.elementType,
    customHeaderIOS: PropTypes.elementType,
    customPickerIOS: PropTypes.elementType,
    date: PropTypes.instanceOf(Date),
    headerTextIOS: PropTypes.string,
    modalPropsIOS: PropTypes.any,
    modalStyleIOS: PropTypes.any,
    isDarkModeEnabled: PropTypes.bool,
    isVisible: PropTypes.bool,
    pickerContainerStyleIOS: PropTypes.any,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    onHide: PropTypes.func,
    maximumDate: PropTypes.instanceOf(Date),
    minimumDate: PropTypes.instanceOf(Date),
  };

  static defaultProps = {
    cancelTextIOS: "Cancel",
    confirmTextIOS: "Confirm",
    headerTextIOS: "Pick a date",
    modalPropsIOS: {},
    date: new Date(),
    isDarkModeEnabled: false,
    isVisible: false,
    pickerContainerStyleIOS: {},
  };

  state = {
    currentDate: this.props.date,
    isPickerVisible: this.props.isVisible,
  };

  didPressConfirm = false;

  componentDidMount() {
    Object.keys(this.props).forEach((prop) => {
      // Show a warning if a deprecated prop is being used
      const deprecationInfo = deprecatedPropsInfo.find((x) => x.prop === prop);
      if (deprecationInfo) {
        console.warn(
          `react-native-modal-datetime-picker: The "${deprecationInfo.prop}" prop is deprecated. Please use the ${deprecationInfo.newProp} prop instead.`
        );
      }
      // Show a warning if a prop that is not supported anymore is being used
      const unsopportInfo = unsopportedPropsInfo.find((x) => x.prop === prop);
      if (unsopportInfo) {
        console.warn(
          `react-native-modal-datetime-picker: The "${unsopportInfo.prop}" prop is not supported anymore.`
        );
      }
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isVisible && !state.isPickerVisible) {
      return { currentDate: props.date, isPickerVisible: true };
    }
    return null;
  }

  handleCancel = () => {
    this.didPressConfirm = false;
    this.props.onCancel();
  };

  handleConfirm = () => {
    this.didPressConfirm = true;
    this.props.onConfirm(this.state.currentDate);
  };

  handleHide = () => {
    // Deprecated
    const {
      onModalHide, // Deprecated
      onHide,
    } = this.props;
    if (onModalHide) {
      onModalHide(this.didPressConfirm, this.state.currentDate);
    } else if (onHide) {
      onHide(this.didPressConfirm, this.state.currentDate);
    }
    this.setState({ isPickerVisible: false });
  };

  handleChange = (event, date) => {
    if (this.props.onChange) {
      this.props.onChange(date);
    }
    this.setState({ currentDate: date });
  };

  render() {
    const {
      cancelTextIOS,
      confirmTextIOS,
      customCancelButtonIOS,
      customConfirmButtonIOS,
      customDatePickerIOS, // Deprecated
      customHeaderIOS,
      customPickerIOS,
      customTitleContainerIOS, // Deprecated
      date,
      headerTextIOS,
      isDarkModeEnabled,
      isVisible,
      modalStyleIOS,
      modalPropsIOS,
      pickerContainerStyleIOS,
      onCancel,
      onConfirm,
      onChange,
      onHide,
      onHideAfterConfirm, // Deprecated
      titleIOS, // Deprecated
      ...otherProps
    } = this.props;

    const ConfirmButtonComponent = customConfirmButtonIOS || ConfirmButton;
    const CancelButtonComponent = customCancelButtonIOS || CancelButton;
    const HeaderComponent =
      typeof (customTitleContainerIOS || customHeaderIOS) === "undefined"
        ? Header
        : customTitleContainerIOS || customHeaderIOS;
    const PickerComponent =
      customDatePickerIOS || customPickerIOS || DateTimePicker;

    const themedContainerStyle = isDarkModeEnabled
      ? pickerStyles.containerDark
      : pickerStyles.containerLight;

    return (
      <Modal
        isVisible={isVisible}
        contentStyle={[pickerStyles.modal, modalStyleIOS]}
        onBackdropPress={this.handleCancel}
        onHide={this.handleHide}
        {...modalPropsIOS}
      >
        <View
          style={[
            pickerStyles.container,
            themedContainerStyle,
            pickerContainerStyleIOS,
          ]}
        >
          <HeaderComponent label={titleIOS || headerTextIOS} />
          <PickerComponent
            {...otherProps}
            value={this.state.currentDate}
            onChange={this.handleChange}
          />
          <ConfirmButtonComponent
            isDarkModeEnabled={isDarkModeEnabled}
            onPress={this.handleConfirm}
            label={confirmTextIOS}
          />
        </View>
        <CancelButtonComponent
          isDarkModeEnabled={isDarkModeEnabled}
          onPress={this.handleCancel}
          label={cancelTextIOS}
        />
      </Modal>
    );
  }
}

const pickerStyles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 10,
  },
  container: {
    borderRadius: BORDER_RADIUS,
    marginBottom: 8,
    overflow: "hidden",
  },
  containerLight: {
    backgroundColor: BACKGROUND_COLOR_LIGHT,
  },
  containerDark: {
    backgroundColor: BACKGROUND_COLOR_DARK,
  },
});

export const Header = ({ label, style = headerStyles }) => {
  return (
    <View style={style.root}>
      <Text style={style.text}>{label}</Text>
    </View>
  );
};

export const headerStyles = StyleSheet.create({
  root: {
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 14,
    backgroundColor: "transparent",
  },
  text: {
    textAlign: "center",
    color: TITLE_COLOR,
    fontSize: TITLE_FONT_SIZE,
  },
});

export const ConfirmButton = ({
  isDarkModeEnabled,
  onPress,
  label,
  style = confirmButtonStyles,
}) => {
  const underlayColor = isDarkModeEnabled
    ? HIGHLIGHT_COLOR_DARK
    : HIGHLIGHT_COLOR_LIGHT;
  return (
    <TouchableHighlight
      style={style.button}
      underlayColor={underlayColor}
      onPress={onPress}
    >
      <Text style={style.text}>{label}</Text>
    </TouchableHighlight>
  );
};

export const confirmButtonStyles = StyleSheet.create({
  button: {
    borderColor: BORDER_COLOR,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: "transparent",
    height: 57,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: BUTTON_FONT_WEIGHT,
    backgroundColor: "transparent",
  },
});

export const CancelButton = ({
  isDarkModeEnabled,
  onPress,
  label,
  style = cancelButtonStyles,
}) => {
  const themedButtonStyle = isDarkModeEnabled
    ? cancelButtonStyles.buttonDark
    : cancelButtonStyles.buttonLight;
  const underlayColor = isDarkModeEnabled
    ? HIGHLIGHT_COLOR_DARK
    : HIGHLIGHT_COLOR_LIGHT;
  return (
    <TouchableHighlight
      style={[style.button, themedButtonStyle]}
      underlayColor={underlayColor}
      onPress={onPress}
    >
      <Text style={style.text}>{label}</Text>
    </TouchableHighlight>
  );
};

export const cancelButtonStyles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS,
    height: 57,
    marginBottom: isIphoneX() ? 20 : 0,
    justifyContent: "center",
  },
  buttonLight: {
    backgroundColor: BACKGROUND_COLOR_LIGHT,
  },
  buttonDark: {
    backgroundColor: BACKGROUND_COLOR_DARK,
  },
  text: {
    padding: 10,
    textAlign: "center",
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: "600",
    backgroundColor: "transparent",
  },
});
