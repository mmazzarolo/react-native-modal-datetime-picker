import React from "react";
import PropTypes from "prop-types";
import { DatePickerIOS, Text, TouchableHighlight, View } from "react-native";
import ReactNativeModal from "react-native-modal";

import styles from "./index.style";

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

  _handleCancel = () => {
    this.confirmed = false;
    this.props.onCancel();
    this._resetDate();
  };

  _handleConfirm = () => {
    this.confirmed = true;
    this.props.onConfirm(this.state.date);
    this._resetDate();
  };

  _resetDate = () => {
    this.setState({
      date: new Date()
    });
  };

  _handleOnModalHide = () => {
    if (this.confirmed) {
      this.props.onHideAfterConfirm(this.state.date);
    }
  };

  _handleDateChange = date => {
    this.setState({
      date,
      userIsInteractingWithPicker: false
    });
    this.props.onDateChange(date);
  };

  _handleUserTouchInit = () => {
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
        onModalHide={this._handleOnModalHide}
        onModalShow={() => {
          this.setState({
            minuteInterval
          });
        }}
        backdropOpacity={0.4}
        {...reactNativeModalPropsIOS}
      >
        <View style={[styles.datepickerContainer, datePickerContainerStyleIOS]}>
          {!hideTitleContainerIOS &&
            (customTitleContainerIOS || titleContainer)}
          <View
            onStartShouldSetResponderCapture={
              neverDisableConfirmIOS !== true ? this._handleUserTouchInit : null
            }
          >
            <DatePickerComponent
              ref={pickerRefCb}
              mode={mode}
              minuteInterval={this.state.minuteInterval}
              {...otherProps}
              date={this.state.date}
              onDateChange={this._handleDateChange}
            />
          </View>
          <TouchableHighlight
            style={styles.confirmButton}
            underlayColor="#ebebeb"
            onPress={this._handleConfirm}
            disabled={
              !neverDisableConfirmIOS && this.state.userIsInteractingWithPicker
            }
          >
            {confirmButton}
          </TouchableHighlight>
        </View>

        <TouchableHighlight
          style={styles.cancelButton}
          underlayColor="#ebebeb"
          onPress={this._handleCancel}
        >
          {customCancelButtonIOS || cancelButton}
        </TouchableHighlight>
      </ReactNativeModal>
    );
  }
}
