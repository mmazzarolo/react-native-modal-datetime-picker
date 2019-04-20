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
    confirmTextIOS: PropTypes.string,
    customCancelButtonIOS: PropTypes.node,
    customConfirmButtonIOS: PropTypes.node,
    neverDisableConfirmIOS: PropTypes.bool,
    customConfirmButtonWhileInteractingIOS: PropTypes.node,
    customTitleContainerIOS: PropTypes.node,
    hideTitleContainerIOS: PropTypes.bool,
    customDatePickerIOS: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    contentContainerStyleIOS: PropTypes.any,
    datePickerContainerStyleIOS: PropTypes.any,
    date: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(["date", "time", "datetime"]),
    onConfirm: PropTypes.func.isRequired,
    onHideAfterConfirm: PropTypes.func,
    pickerRefCb: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    titleIOS: PropTypes.string,
    isVisible: PropTypes.bool,
    reactNativeModalPropsIOS: PropTypes.any,
    titleStyle: PropTypes.any,
    confirmTextStyle: PropTypes.any,
    cancelTextStyle: PropTypes.any,
    onDateChange: PropTypes.func
  };

  static defaultProps = {
    neverDisableConfirmIOS: false,
    hideTitleContainerIOS: false,
    cancelTextIOS: "Cancel",
    confirmTextIOS: "Confirm",
    date: new Date(),
    mode: "date",
    titleIOS: "Pick a date",
    isVisible: false,
    onHideAfterConfirm: () => {},
    reactNativeModalPropsIOS: {},
    onDateChange: () => {}
  };

  state = {
    date: this.props.date,
    userIsInteractingWithPicker: false,
    minuteInterval: this.props.minuteInterval || 1
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
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
      isVisible,
      mode,
      titleIOS,
      confirmTextIOS,
      cancelTextIOS,
      customCancelButtonIOS,
      customConfirmButtonIOS,
      neverDisableConfirmIOS,
      customConfirmButtonWhileInteractingIOS,
      customDatePickerIOS,
      contentContainerStyleIOS,
      customTitleContainerIOS,
      hideTitleContainerIOS,
      datePickerContainerStyleIOS,
      reactNativeModalPropsIOS,
      titleStyle,
      confirmTextStyle,
      cancelTextStyle,
      pickerRefCb,
      minuteInterval,
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

    return (
      <ReactNativeModal
        isVisible={isVisible}
        style={[styles.contentContainer, contentContainerStyleIOS]}
        onModalHide={this.handleModalHide}
        onModalShow={this.handleModalShow}
        backdropOpacity={0.4}
        {...reactNativeModalPropsIOS}
      >
        <View style={[styles.datepickerContainer, datePickerContainerStyleIOS]}>
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
          style={styles.cancelButton}
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
const BACKGROUND_COLOR = "white";
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
