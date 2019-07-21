import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "./Modal";
import { isIphoneX } from "./utils";

const BORDER_RADIUS = 13;
const BACKGROUND_COLOR = "white";
const BORDER_COLOR = "#d5d5d5";
const TITLE_FONT_SIZE = 20;
const TITLE_COLOR = "#8f8f8f";
const BUTTON_FONT_WEIGHT = "normal";
const BUTTON_FONT_COLOR = "#007ff9";
const BUTTON_FONT_SIZE = 20;
const HIGHLIGHT_COLOR = "#ebebeb";

export default class DateTimePickerModal extends React.PureComponent {
  static propTypes = {
    cancelLabelIOS: PropTypes.string,
    confirmLabelIOS: PropTypes.string,
    customCancelButtonIOS: PropTypes.node,
    customConfirmButtonIOS: PropTypes.node,
    customHeaderIOS: PropTypes.node,
    date: PropTypes.instanceOf(Date),
    headerLabelIOS: PropTypes.string,
    modalStyleIOS: PropTypes.any,
    isVisible: PropTypes.bool,
    pickerContainerStyleIOS: PropTypes.any,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    onPickerHide: PropTypes.func
  };

  static defaultProps = {
    cancelLabelIOS: "Cancel",
    confirmLabelIOS: "Confirm",
    headerLabelIOS: "Pick a date",
    date: new Date(),
    isVisible: false,
    pickerContainerStyleIOS: {}
  };

  state = {
    currentDate: this.props.date,
    isPickerVisible: this.props.isVisible,
    isUserInteractingWithPicker: false
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

  handleModalHide = () => {
    if (this.props.onPickerHide) {
      this.props.onPickerHide(this.didPressConfirm, this.state.currentDate);
    }
    this.setState({ isPickerVisible: false });
  };

  handleChange = (event, date) => {
    if (this.props.onChange) {
      this.props.onChange(date);
    }
    this.setState({ currentDate: date, isUserInteractingWithPicker: false });
  };

  handleUserTouchInit = () => {
    this.setState({ isUserInteractingWithPicker: true });
    return false;
  };

  render() {
    const {
      cancelLabelIOS,
      confirmLabelIOS,
      customCancelButtonIOS,
      customConfirmButtonIOS,
      customHeaderIOS,
      date,
      headerLabelIOS,
      isVisible,
      modalStyleIOS,
      pickerContainerStyleIOS,
      onCancel,
      onConfirm,
      onChange,
      onPickerHide,
      ...otherProps
    } = this.props;

    const ConfirmButtonComponent = customConfirmButtonIOS || ConfirmButton;
    const CancelButtonComponent = customCancelButtonIOS || CancelButton;
    const HeaderComponent = customHeaderIOS || Header;

    return (
      <Modal
        isVisible={isVisible}
        style={pickerStyles.modal}
        onBackdropPress={this.handleCancel}
        onModalHide={this.handleModalHide}
      >
        <View style={[pickerStyles.container, pickerContainerStyleIOS]}>
          <HeaderComponent label={headerLabelIOS} />
          <View onStartShouldSetResponderCapture={this.handleUserTouchInit}>
            <DateTimePicker
              {...otherProps}
              value={this.state.currentDate}
              onChange={this.handleChange}
            />
          </View>
          <ConfirmButtonComponent
            disabled={this.state.isUserInteractingWithPicker}
            onPress={this.handleConfirm}
            label={confirmLabelIOS}
          />
        </View>
        <CancelButtonComponent
          onPress={this.handleCancel}
          label={cancelLabelIOS}
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
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS,
    marginBottom: 8,
    overflow: "hidden"
  }
});

export const Header = ({ label, textStyle = {} }) => {
  return (
    <View style={headerStyles.root}>
      <Text style={[headerStyles.text, textStyle]}>{label}</Text>
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
  disabled,
  onPress,
  label,
  buttonStyle = {},
  textStyle = {}
}) => {
  return (
    <TouchableHighlight
      style={[confirmButtonStyles.button, buttonStyle]}
      underlayColor={HIGHLIGHT_COLOR}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          confirmButtonStyles.text,
          disabled && confirmButtonStyles.textDisabled,
          textStyle
        ]}
      >
        {label}
      </Text>
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
  },
  textDisabled: {
    opacity: 0.4
  }
});

export const CancelButton = ({
  disabled,
  onPress,
  label,
  buttonStyle = {},
  textStyle = {}
}) => {
  return (
    <TouchableHighlight
      style={[cancelButtonStyles.button, buttonStyle]}
      underlayColor={HIGHLIGHT_COLOR}
      onPress={onPress}
    >
      <Text style={[cancelButtonStyles.text, textStyle]}>{label}</Text>
    </TouchableHighlight>
  );
};

const cancelButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS,
    height: 57,
    marginBottom: isIphoneX() ? 20 : 0,
    justifyContent: "center"
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
