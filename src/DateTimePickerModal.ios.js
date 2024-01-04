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

export class DateTimePickerModal extends React.PureComponent {
  static propTypes = {
    buttonTextColorIOS: PropTypes.string,
    cancelButtonTestID: PropTypes.string,
    confirmButtonTestID: PropTypes.string,
    cancelTextIOS: PropTypes.string,
    confirmTextIOS: PropTypes.string,
    customCancelButtonIOS: PropTypes.elementType,
    customConfirmButtonIOS: PropTypes.elementType,
    customHeaderIOS: PropTypes.elementType,
    customPickerIOS: PropTypes.elementType,
    date: PropTypes.instanceOf(Date),
    modalPropsIOS: PropTypes.any,
    modalStyleIOS: PropTypes.any,
    isDarkModeEnabled: PropTypes.bool,
    isVisible: PropTypes.bool,
    pickerContainerStyleIOS: PropTypes.any,
    pickerStyleIOS: PropTypes.any,
    backdropStyleIOS: PropTypes.any,
    pickerComponentStyleIOS: PropTypes.any,
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
    isVisible: false,
    pickerContainerStyleIOS: {},
    pickerStyleIOS: {},
    backdropStyleIOS: {},
    pickerComponentStyleIOS: {},
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
      isDarkModeEnabled,
      isVisible,
      modalStyleIOS,
      modalPropsIOS,
      pickerContainerStyleIOS,
      pickerStyleIOS,
      pickerComponentStyleIOS,
      onCancel,
      onConfirm,
      onChange,
      onHide,
      backdropStyleIOS,
      buttonTextColorIOS,
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
    const PickerComponent = customPickerIOS || DateTimePicker;
    const HeaderComponent = customHeaderIOS;

    const themedContainerStyle = _isDarkModeEnabled
      ? pickerStyles.containerDark
      : pickerStyles.containerLight;

    return (
      <Modal
        isVisible={isVisible}
        contentStyle={[pickerStyles.modal, modalStyleIOS]}
        onBackdropPress={this.handleCancel}
        onHide={this.handleHide}
        backdropStyle={backdropStyleIOS}
        {...modalPropsIOS}
      >
        <View
          style={[
            pickerStyles.container,
            themedContainerStyle,
            pickerContainerStyleIOS,
          ]}
        >
          {HeaderComponent && <HeaderComponent />}
          {!HeaderComponent && display === "inline" && (
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
              // Recent versions @react-native-community/datetimepicker (at least starting with 6.7.0)
              // have a peculiar iOS behaviour where sometimes, for example in react-native Modal,
              // the inline picker is not rendered correctly if in datetime mode. Explicitly setting the height
              // of the native picker to 370 fixes this issue. This is dependent on the other styles applied to the picker
              // and may need to be adjusted if the other styles are changed.
              style={[
                {
                  height:
                    !customPickerIOS &&
                    otherProps.mode === "datetime" &&
                    display === "inline"
                      ? 370
                      : undefined,
                },
                pickerComponentStyleIOS,
              ]}
            />
          </View>
          <ConfirmButtonComponent
            confirmButtonTestID={confirmButtonTestID}
            isDarkModeEnabled={_isDarkModeEnabled}
            onPress={this.handleConfirm}
            label={confirmTextIOS}
            buttonTextColorIOS={buttonTextColorIOS}
          />
        </View>
        <CancelButtonComponent
          cancelButtonTestID={cancelButtonTestID}
          isDarkModeEnabled={_isDarkModeEnabled}
          onPress={this.handleCancel}
          label={cancelTextIOS}
          buttonTextColorIOS={buttonTextColorIOS}
        />
      </Modal>
    );
  }
}

const pickerStyles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 10,
    marginBottom: isIphoneX() ? 34 : 10,
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

export const ConfirmButton = ({
  isDarkModeEnabled,
  confirmButtonTestID,
  onPress,
  label,
  buttonTextColorIOS,
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
      <Text
        style={[
          style.text,
          buttonTextColorIOS && { color: buttonTextColorIOS },
        ]}
      >
        {label}
      </Text>
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
  buttonTextColorIOS,
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
      style={[themedButtonStyle, style.button]}
      underlayColor={underlayColor}
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text
        style={[
          style.text,
          buttonTextColorIOS && { color: buttonTextColorIOS },
        ]}
      >
        {label}
      </Text>
    </TouchableHighlight>
  );
};

export const cancelButtonStyles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS,
    height: 57,
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
