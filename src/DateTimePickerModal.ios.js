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
    cancelButtonComponentIOS: PropTypes.node,
    configComponentIOS: PropTypes.node,
    headerComponentIOS: PropTypes.node,
    date: PropTypes.instanceOf(Date),
    headerLabelIOS: PropTypes.string,
    modalStyleIOS: PropTypes.any,
    isVisible: PropTypes.bool,
    pickerContainerStyleIOS: PropTypes.any,
    pickerComponentIOS: PropTypes.node,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    onHide: PropTypes.func
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
    isPickerSpinning: false
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
    if (this.props.onHide) {
      this.props.onHide(this.didPressConfirm, this.state.currentDate);
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
      cancelLabelIOS,
      confirmLabelIOS,
      cancelButtonComponentIOS,
      confirmButtonComponentIOS,
      headerComponentIOS,
      date,
      headerLabelIOS,
      isVisible,
      modalStyleIOS,
      pickerContainerStyleIOS,
      pickerComponentIOS,
      onCancel,
      onConfirm,
      onChange,
      onHide,
      ...otherProps
    } = this.props;

    const ConfirmButtonComponent = confirmButtonComponentIOS || ConfirmButton;
    const CancelButtonComponent = cancelButtonComponentIOS || CancelButton;
    const HeaderComponent = headerComponentIOS || Header;
    const PickerComponent = pickerComponentIOS || DateTimePicker;

    return (
      <Modal
        isVisible={isVisible}
        style={[pickerStyles.modal, modalStyleIOS]}
        onBackdropPress={this.handleCancel}
        onModalHide={this.handleModalHide}
      >
        <View style={[pickerStyles.container, pickerContainerStyleIOS]}>
          <HeaderComponent label={headerLabelIOS} />
          <View onStartShouldSetResponderCapture={this.handleUserTouchInit}>
            <PickerComponent
              {...otherProps}
              value={this.state.currentDate}
              onChange={this.handleChange}
            />
          </View>
          <ConfirmButtonComponent
            disabled={this.state.isPickerSpinning}
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

export const ConfirmButton = ({ disabled, onPress, label }) => {
  return (
    <TouchableHighlight
      style={confirmButtonStyles.button}
      underlayColor={HIGHLIGHT_COLOR}
      onPress={onPress}
      disabled={disabled}
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

export const CancelButton = ({ disabled, onPress, label }) => {
  return (
    <TouchableHighlight
      style={cancelButtonStyles.button}
      underlayColor={HIGHLIGHT_COLOR}
      onPress={onPress}
    >
      <Text style={cancelButtonStyles.text}>{label}</Text>
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
