import React from "react";
import PropTypes from "prop-types";
import {
  DatePickerIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import ReactNativeModal from "react-native-modal";
import { isIphoneX } from "./utils";

export default class CustomDatePickerIOS extends React.PureComponent {
  static propTypes = {
    cancelTextIOS: PropTypes.string,
    cancelTextStyle: PropTypes.any,
    confirmTextIOS: PropTypes.string,
    confirmTextStyle: PropTypes.any,
    contentContainerStyleIOS: PropTypes.any,
    cancelButtonContainerStyleIOS: PropTypes.any,
    customCancelButtonIOS: PropTypes.node,
    customConfirmButtonIOS: PropTypes.node,
    customConfirmButtonWhileInteractingIOS: PropTypes.node,
    customDatePickerIOS: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    customTitleContainerIOS: PropTypes.node,
    dismissOnBackdropPressIOS: PropTypes.bool,
    hideTitleContainerIOS: PropTypes.bool,
    isDarkModeEnabled: PropTypes.bool,
    isVisible: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    datePickerContainerStyleIOS: PropTypes.any,
    mode: PropTypes.oneOf(["date", "time", "datetime"]),
    neverDisableConfirmIOS: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onDateChange: PropTypes.func,
    onHideAfterConfirm: PropTypes.func,
    pickerRefCb: PropTypes.func,
    reactNativeModalPropsIOS: PropTypes.any,
    titleIOS: PropTypes.string,
    titleStyle: PropTypes.any
  };

  static defaultProps = {
    cancelTextIOS: "Cancel",
    confirmTextIOS: "Confirm",
    date: new Date(),
    dismissOnBackdropPressIOS: true,
    hideTitleContainerIOS: false,
    isDarkModeEnabled: false,
    isVisible: false,
    mode: "date",
    neverDisableConfirmIOS: false,
    onHideAfterConfirm: () => {},
    onDateChange: () => {},
    reactNativeModalPropsIOS: {},
    titleIOS: "Pick a date"
  };

  state = {
    date: this.props.date,
    userIsInteractingWithPicker: false,
    minuteInterval: this.props.minuteInterval || 1
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.date.valueOf() !== nextProps.date.valueOf()) {
      this.setState({
        date: nextProps.date
      });
    }
  }

  handleCancel = () => {
    this.confirmed = false;
    this.props.onCancel();
    this.resetDate();
  };

  handleConfirm = () => {
    this.confirmed = true;
    this.props.onConfirm(this.state.date);
    this.resetDate();
  };

  resetDate = () => {
    this.setState({
      date: this.props.date
    });
  };

  handleModalShow = () => {
    this.setState({ minuteInterval: this.props.minuteInterval });
  };

  handleModalHide = () => {
    if (this.confirmed) {
      this.props.onHideAfterConfirm(this.state.date);
    }
  };

  handleDateChange = date => {
    this.setState({
      date,
      userIsInteractingWithPicker: false
    });
    this.props.onDateChange(date);
  };

  handleUserTouchInit = () => {
    // custom date picker shouldn't change this param
    if (!this.props.customDatePickerIOS) {
      this.setState({
        userIsInteractingWithPicker: true
      });
    }
    return false;
  };

  render() {
    const {
      cancelTextIOS,
      cancelTextStyle,
      confirmTextIOS,
      confirmTextStyle,
      contentContainerStyleIOS,
      cancelButtonContainerStyleIOS,
      customCancelButtonIOS,
      customConfirmButtonIOS,
      customConfirmButtonWhileInteractingIOS,
      customDatePickerIOS,
      customTitleContainerIOS,
      datePickerContainerStyleIOS,
      dismissOnBackdropPressIOS,
      hideTitleContainerIOS,
      isDarkModeEnabled,
      isVisible,
      minuteInterval,
      mode,
      neverDisableConfirmIOS,
      pickerRefCb,
      reactNativeModalPropsIOS,
      titleIOS,
      titleStyle,
      ...otherProps
    } = this.props;

    const titleContainer = (
      <View style={styles.titleContainer}>
        <Text style={[styles.title, titleStyle]}>{titleIOS}</Text>
      </View>
    );
    let confirmButton;

    // Interested PR: https://github.com/mmazzarolo/react-native-modal-datetime-picker/pull/40
    // Issue on React-Native: https://github.com/facebook/react-native/issues/8169
    // Up until now when the user interacted with the picker, if he tapped on the confirm button,
    // the state was not yet changed and thus the picked value would be old and miss-leading.
    // DatePickerIOS does not update on the fly, and before it even manages to dispatch an update,
    // our component is unmounted and thus the state is lost.
    // We no longer allow our user to tap the confirm button unless the picker is still.
    // They can always tap the cancel button anyway.
    if (customConfirmButtonIOS) {
      if (
        customConfirmButtonWhileInteractingIOS &&
        this.state.userIsInteractingWithPicker
      ) {
        confirmButton = customConfirmButtonWhileInteractingIOS;
      } else {
        confirmButton = customConfirmButtonIOS;
      }
    } else {
      confirmButton = (
        <Text style={[styles.confirmText, confirmTextStyle]}>
          {confirmTextIOS}
        </Text>
      );
    }
    const cancelButton = (
      <Text style={[styles.cancelText, cancelTextStyle]}>{cancelTextIOS}</Text>
    );
    const DatePickerComponent = customDatePickerIOS || DatePickerIOS;

    const reactNativeModalProps = {
      onBackdropPress: dismissOnBackdropPressIOS
        ? this.handleCancel
        : () => null,
      ...reactNativeModalPropsIOS
    };

    const backgroundColor = isDarkModeEnabled ? BACKGROUND_COLOR_DARK : BACKGROUND_COLOR_LIGHT;

    return (
      <ReactNativeModal
        isVisible={isVisible}
        style={[styles.contentContainer, contentContainerStyleIOS]}
        onModalHide={this.handleModalHide}
        onModalShow={this.handleModalShow}
        backdropOpacity={0.4}
        {...reactNativeModalProps}
      >
        <View style={[styles.datepickerContainer, { backgroundColor }, datePickerContainerStyleIOS]}>
          {!hideTitleContainerIOS &&
            (customTitleContainerIOS || titleContainer)}
          <View
            onStartShouldSetResponderCapture={
              neverDisableConfirmIOS !== true ? this.handleUserTouchInit : null
            }
          >
            <DatePickerComponent
              ref={pickerRefCb}
              mode={mode}
              minuteInterval={this.state.minuteInterval}
              {...otherProps}
              date={this.state.date}
              onDateChange={this.handleDateChange}
            />
          </View>
          <TouchableHighlight
            style={styles.confirmButton}
            underlayColor={HIGHLIGHT_COLOR}
            onPress={this.handleConfirm}
            disabled={
              !neverDisableConfirmIOS && this.state.userIsInteractingWithPicker
            }
          >
            {confirmButton}
          </TouchableHighlight>
        </View>

        <TouchableHighlight
          style={[styles.cancelButton, { backgroundColor }, cancelButtonContainerStyleIOS]}
          underlayColor={HIGHLIGHT_COLOR}
          onPress={this.handleCancel}
        >
          {customCancelButtonIOS || cancelButton}
        </TouchableHighlight>
      </ReactNativeModal>
    );
  }
}

const BORDER_RADIUS = 13;
const BACKGROUND_COLOR_LIGHT = "white";
const BACKGROUND_COLOR_DARK = "#0E0E0E";
const BORDER_COLOR = "#d5d5d5";
const TITLE_FONT_SIZE = 13;
const TITLE_COLOR = "#8f8f8f";
const BUTTON_FONT_WEIGHT = "normal";
const BUTTON_FONT_COLOR = "#007ff9";
const BUTTON_FONT_SIZE = 20;
const HIGHLIGHT_COLOR = "#ebebeb";

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "flex-end",
    margin: 10
  },
  datepickerContainer: {
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
