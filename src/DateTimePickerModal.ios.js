import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Appearance,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "./Modal";
import { isIphoneX } from "./utils";

export const BACKGROUND_COLOR_LIGHT = "white";
export const BACKGROUND_COLOR_DARK = "#0E0E0E";
export const BORDER_COLOR = "#d5d5d5";
export const BORDER_COLOR_DARK = "#272729";
export const BORDER_RADIUS = 13;
export const BUTTON_FONT_WEIGHT = "normal";
export const BUTTON_FONT_COLOR = "#007ff9";
export const BUTTON_FONT_SIZE = 20;
export const HIGHLIGHT_COLOR_DARK = "#444444";
export const HIGHLIGHT_COLOR_LIGHT = "#ebebeb";
export const TITLE_FONT_SIZE = 20;
export const TITLE_COLOR = "#8f8f8f";

export class DateTimePickerModal extends React.PureComponent {
  static propTypes = {
    cancelButtonTestID: PropTypes.string,
    confirmButtonTestID: PropTypes.string,
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
    isHeaderVisibleIOS: PropTypes.bool,
    isVisible: PropTypes.bool,
    pickerContainerStyleIOS: PropTypes.any,
    pickerStyleIOS: PropTypes.any,
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
    modalPropsIOS: {},
    date: new Date(),
    isDarkModeEnabled: undefined,
    isHeaderVisibleIOS: false,
    isVisible: false,
    pickerContainerStyleIOS: {},
    pickerStyleIOS: {},
  };

  state = {
    currentDate: this.props.date,
    isPickerVisible: this.props.isVisible,
  };

  didPressConfirm = false;

  static getDerivedStateFromProps(props, state) {
    if (props.isVisible && !state.isPickerVisible) {
      return { currentDate: props.date, isPickerVisible: true };
    }
    return null;
  }

  componentDidMount() {
    if (this.props.isHeaderVisibleIOS) {
      console.warn(
        `Please notice that the built-in iOS header will not be supported anymore in the future. If you're still planning to show a header, it's recommended to provide your own header implementation using "customHeaderIOS" (which will continue to be supported).`
      );
    }
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
    const { onHide } = this.props;
    if (onHide) {
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
      cancelButtonTestID,
      confirmButtonTestID,
      cancelTextIOS,
      confirmTextIOS,
      customCancelButtonIOS,
      customConfirmButtonIOS,
      customHeaderIOS,
      customPickerIOS,
      date,
      display,
      headerTextIOS,
      isDarkModeEnabled,
      isHeaderVisibleIOS,
      isVisible,
      modalStyleIOS,
      modalPropsIOS,
      pickerContainerStyleIOS,
      pickerStyleIOS,
      onCancel,
      onConfirm,
      onChange,
      onHide,
      ...otherProps
    } = this.props;
    const isAppearanceModuleAvailable = !!(
      Appearance && Appearance.getColorScheme
    );
    const _isDarkModeEnabled =
      isDarkModeEnabled === undefined && isAppearanceModuleAvailable
        ? Appearance.getColorScheme() === "dark"
        : isDarkModeEnabled || false;

    const ConfirmButtonComponent = customConfirmButtonIOS || ConfirmButton;
    const CancelButtonComponent = customCancelButtonIOS || CancelButton;
    const HeaderComponent = customHeaderIOS || Header;
    const PickerComponent = customPickerIOS || DateTimePicker;

    const themedContainerStyle = _isDarkModeEnabled
      ? pickerStyles.containerDark
      : pickerStyles.containerLight;

    const headerText =
      headerTextIOS ||
      (this.props.mode === "time" ? "Pick a time" : "Pick a date");

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
          {isHeaderVisibleIOS && <HeaderComponent label={headerText} />}
          {!isHeaderVisibleIOS && display === "inline" && (
            <View style={pickerStyles.headerFiller} />
          )}
          <View
            style={[
              display === "inline"
                ? pickerStyles.pickerInline
                : pickerStyles.pickerSpinner,
              pickerStyleIOS,
            ]}
          >
            <PickerComponent
              display={display || "spinner"}
              {...otherProps}
              value={this.state.currentDate}
              onChange={this.handleChange}
            />
          </View>
          <ConfirmButtonComponent
            confirmButtonTestID={confirmButtonTestID}
            isDarkModeEnabled={_isDarkModeEnabled}
            onPress={this.handleConfirm}
            label={confirmTextIOS}
          />
        </View>
        <CancelButtonComponent
          cancelButtonTestID={cancelButtonTestID}
          isDarkModeEnabled={_isDarkModeEnabled}
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
  pickerSpinner: {
    marginBottom: 8,
  },
  pickerInline: {
    paddingHorizontal: 12,
    paddingTop: 14,
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
  confirmButtonTestID,
  onPress,
  label,
  style = confirmButtonStyles,
}) => {
  const themedButtonStyle = isDarkModeEnabled
    ? confirmButtonStyles.buttonDark
    : confirmButtonStyles.buttonLight;

  const underlayColor = isDarkModeEnabled
    ? HIGHLIGHT_COLOR_DARK
    : HIGHLIGHT_COLOR_LIGHT;
  return (
    <TouchableHighlight
      testID={confirmButtonTestID}
      style={[themedButtonStyle, style.button]}
      underlayColor={underlayColor}
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={style.text}>{label}</Text>
    </TouchableHighlight>
  );
};

export const confirmButtonStyles = StyleSheet.create({
  button: {
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: "transparent",
    height: 57,
    justifyContent: "center",
  },
  buttonLight: {
    borderColor: BORDER_COLOR,
  },
  buttonDark: {
    borderColor: BORDER_COLOR_DARK,
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
  cancelButtonTestID,
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
      testID={cancelButtonTestID}
      style={[style.button, themedButtonStyle]}
      underlayColor={underlayColor}
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={label}
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
