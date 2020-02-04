import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "./Modal";
import { isIphoneX } from "./utils";

const BORDER_RADIUS = 13;
const BACKGROUND_COLOR_LIGHT = "white";
const BACKGROUND_COLOR_DARK = "#0E0E0E";
const BORDER_COLOR = "#d5d5d5";
const TITLE_FONT_SIZE = 20;
const TITLE_COLOR = "#8f8f8f";
const BUTTON_FONT_WEIGHT = "normal";
const BUTTON_FONT_COLOR = "#007ff9";
const BUTTON_FONT_SIZE = 20;
const HIGHLIGHT_COLOR_LIGHT = "#ebebeb";
const HIGHLIGHT_COLOR_DARK = "#444444";

const deprecatedPropsInfo = [
  { prop: "titleIOS", newProp: "headerTextIOS" },
  { prop: "customTitleContainerIOS", newProp: "customHeaderIOS" },
  { prop: "onHideAfterConfirm", newProp: "onHide" },
  { prop: "customDatePickerIOS", newProp: "customPickerIOS" }
];

const unsopportedPropsInfo = [
  { prop: "cancelTextStyle" },
  { prop: "confirmTextStyle" },
  { prop: "datePickerModeAndroid" },
  { prop: "dismissOnBackdropPressIOS" },
  { prop: "hideTitleContainerIOS" },
  { prop: "neverDisableConfirmIOS" },
  { prop: "pickerRefCb" },
  { prop: "reactNativeModalPropsIOS" }
];

export default class DateTimePickerModal extends React.PureComponent {
  static propTypes = {
    cancelTextIOS: PropTypes.string,
    confirmTextIOS: PropTypes.string,
    customCancelButtonIOS: PropTypes.elementType,
    customConfirmButtonIOS: PropTypes.elementType,
    customHeaderIOS: PropTypes.elementType,
    customPickerIOS: PropTypes.elementType,
    date: PropTypes.instanceOf(Date),
    headerTextIOS: PropTypes.string,
    modalStyleIOS: PropTypes.any,
    isDarkModeEnabled: PropTypes.bool,
    isVisible: PropTypes.bool,
    pickerContainerStyleIOS: PropTypes.any,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    onHide: PropTypes.func,
    maximumDate: PropTypes.instanceOf(Date),
    minimumDate: PropTypes.instanceOf(Date)
  };

  static defaultProps = {
    cancelTextIOS: "Cancel",
    confirmTextIOS: "Confirm",
    headerTextIOS: "Pick a date",
    date: new Date(),
    isDarkModeEnabled: false,
    isVisible: false,
    pickerContainerStyleIOS: {}
  };

  state = {
    currentDate: this.props.date,
    isPickerVisible: this.props.isVisible,
    isPickerSpinning: false
  };

  didPressConfirm = false;

  componentDidMount() {
    Object.keys(this.props).forEach(prop => {
      // Show a warning if a deprecated prop is being used
      const deprecationInfo = deprecatedPropsInfo.find(x => x.prop === prop);
      if (deprecationInfo) {
        console.warn(
          `react-native-modal-datetime-picker: The "${deprecationInfo.prop}" prop is deprecated. Please use the ${deprecationInfo.newProp} prop instead.`
        );
      }
      // Show a warning if a prop that is not supported anymore is being used
      const unsopportInfo = unsopportedPropsInfo.find(x => x.prop === prop);
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
      onHide
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
    this.setState({ currentDate: date, isPickerSpinning: false });
  };

  handleUserTouchInit = () => {
    this.setState({ isPickerSpinning: true });
    return false;
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
      >
        <View
          style={[
            pickerStyles.container,
            themedContainerStyle,
            pickerContainerStyleIOS
          ]}
        >
          <HeaderComponent label={titleIOS || headerTextIOS} />
          <View onStartShouldSetResponderCapture={this.handleUserTouchInit}>
            <PickerComponent
              {...otherProps}
              value={this.state.currentDate}
              onChange={this.handleChange}
            />
          </View>
          <ConfirmButtonComponent
            isDarkModeEnabled={isDarkModeEnabled}
            isDisabled={this.state.isPickerSpinning}
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
    margin: 10
  },
  container: {
    borderRadius: BORDER_RADIUS,
    marginBottom: 8,
    overflow: "hidden"
  },
  containerLight: {
    backgroundColor: BACKGROUND_COLOR_LIGHT
  },
  containerDark: {
    backgroundColor: BACKGROUND_COLOR_DARK
  }
});

export const Header = ({ label }) => {
  return (
    <View style={headerStyles.root}>
      <Text style={headerStyles.text}>{label}</Text>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  root: {
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 14,
    backgroundColor: "transparent"
  },
  text: {
    textAlign: "center",
    color: TITLE_COLOR,
    fontSize: TITLE_FONT_SIZE
  }
});

export const ConfirmButton = ({
  isDarkModeEnabled,
  isDisabled,
  onPress,
  label
}) => {
  const underlayColor = isDarkModeEnabled
    ? HIGHLIGHT_COLOR_DARK
    : HIGHLIGHT_COLOR_LIGHT;
  return (
    <TouchableHighlight
      style={confirmButtonStyles.button}
      underlayColor={underlayColor}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={confirmButtonStyles.text}>{label}</Text>
    </TouchableHighlight>
  );
};

const confirmButtonStyles = StyleSheet.create({
  button: {
    borderColor: BORDER_COLOR,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: "transparent",
    height: 57,
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: BUTTON_FONT_WEIGHT,
    backgroundColor: "transparent"
  }
});

export const CancelButton = ({ isDarkModeEnabled, onPress, label }) => {
  const themedButtonStyle = isDarkModeEnabled
    ? cancelButtonStyles.buttonDark
    : cancelButtonStyles.buttonLight;
  const underlayColor = isDarkModeEnabled
    ? HIGHLIGHT_COLOR_DARK
    : HIGHLIGHT_COLOR_LIGHT;
  return (
    <TouchableHighlight
      style={[cancelButtonStyles.button, themedButtonStyle]}
      underlayColor={underlayColor}
      onPress={onPress}
    >
      <Text style={cancelButtonStyles.text}>{label}</Text>
    </TouchableHighlight>
  );
};

const cancelButtonStyles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS,
    height: 57,
    marginBottom: isIphoneX() ? 20 : 0,
    justifyContent: "center"
  },
  buttonLight: {
    backgroundColor: BACKGROUND_COLOR_LIGHT
  },
  buttonDark: {
    backgroundColor: BACKGROUND_COLOR_DARK
  },
  text: {
    padding: 10,
    textAlign: "center",
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: "600",
    backgroundColor: "transparent"
  }
});
