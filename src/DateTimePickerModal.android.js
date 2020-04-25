import React from "react";
import PropTypes from "prop-types";
import DateTimePicker from "@react-native-community/datetimepicker";

export class DateTimePickerModal extends React.PureComponent {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    isVisible: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onHide: PropTypes.func,
    maximumDate: PropTypes.instanceOf(Date),
    minimumDate: PropTypes.instanceOf(Date),
  };

  static defaultProps = {
    date: new Date(),
    isVisible: false,
    onHide: () => {},
  };

  state = {
    currentMode: null,
  };

  currentDate = this.props.date;

  static getDerivedStateFromProps(props, state) {
    if (props.isVisible && state.currentMode === null) {
      return { currentMode: props.mode === "time" ? "time" : "date" };
    } else if (!props.isVisible) {
      return { currentMode: null };
    }
    return null;
  }

  handleChange = (event, date) => {
    if (event.type === "dismissed") {
      this.props.onCancel();
      this.props.onHide(false);
      return;
    }
    if (this.props.mode === "datetime") {
      if (this.state.currentMode === "date") {
        this.currentDate = new Date(date);
        this.setState({ currentMode: "time" });
        return;
      } else if (this.state.currentMode === "time") {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const day = this.currentDate.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        this.currentDate = new Date(year, month, day, hours, minutes);
      }
    } else {
      this.currentDate = date;
    }
    this.props.onConfirm(this.currentDate);
    this.props.onHide(true, this.currentDate);
  };

  render() {
    const { isVisible, date, ...otherProps } = this.props;
    const { currentMode } = this.state;
    if (!isVisible || !currentMode) return null;
    return (
      <DateTimePicker
        {...otherProps}
        mode={currentMode}
        value={date}
        onChange={this.handleChange}
      />
    );
  }
}
