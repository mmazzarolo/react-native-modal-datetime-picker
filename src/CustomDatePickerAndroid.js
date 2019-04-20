import React from "react";
import PropTypes from "prop-types";
import { DatePickerAndroid, TimePickerAndroid } from "react-native";

export default class CustomDatePickerAndroid extends React.PureComponent {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(["date", "time", "datetime"]),
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onHideAfterConfirm: PropTypes.func,
    is24Hour: PropTypes.bool,
    isVisible: PropTypes.bool,
    datePickerModeAndroid: PropTypes.oneOf(["calendar", "spinner", "default"]),
    timePickerModeAndroid: PropTypes.oneOf(["clock", "spinner", "default"]),
    minimumDate: PropTypes.instanceOf(Date),
    maximumDate: PropTypes.instanceOf(Date)
  };

  static defaultProps = {
    date: new Date(),
    mode: "date",
    datePickerModeAndroid: "default",
    timePickerModeAndroid: "default",
    is24Hour: true,
    isVisible: false,
    onHideAfterConfirm: () => {}
  };

  componentDidUpdate = prevProps => {
    if (!prevProps.isVisible && this.props.isVisible) {
      if (this.props.mode === "date" || this.props.mode === "datetime") {
        this.showDatePickerAndroid().catch(console.error);
      } else {
        this.showTimePickerAndroid().catch(console.error);
      }
    }
  };

  componentDidMount = () => {
    if (this.props && this.props.isVisible) {
      if (this.props.mode === "date" || this.props.mode === "datetime") {
        this.showDatePickerAndroid().catch(console.error);
      } else {
        this.showTimePickerAndroid().catch(console.error);
      }
    }
  };

  showDatePickerAndroid = async () => {
    let picked;
    try {
      picked = await DatePickerAndroid.open({
        date: this.props.date,
        minDate: this.props.minimumDate,
        maxDate: this.props.maximumDate,
        mode: this.props.datePickerModeAndroid
      });
    } catch ({ message }) {
      console.warn("Cannot open date picker", message);
      return;
    }

    const { action, year, month, day } = picked;
    if (action !== DatePickerAndroid.dismissedAction) {
      let date;
      if (this.props.date && !isNaN(this.props.date.getTime())) {
        let hour = this.props.date.getHours();
        let minute = this.props.date.getMinutes();
        date = new Date(year, month, day, hour, minute);
      } else {
        date = new Date(year, month, day);
      }

      if (this.props.mode === "datetime") {
        // Prepopulate and show time picker
        const timeOptions = {
          is24Hour: this.props.is24Hour,
          mode: this.props.timePickerModeAndroid
        };
        if (this.props.date) {
          timeOptions.hour = this.props.date.getHours();
          timeOptions.minute = this.props.date.getMinutes();
        }

        let pickedTime;
        try {
          pickedTime = await TimePickerAndroid.open(timeOptions);
        } catch ({ message }) {
          console.warn("Cannot open time picker", message);
          return;
        }

        const { action: timeAction, hour, minute } = pickedTime;
        if (timeAction !== TimePickerAndroid.dismissedAction) {
          const selectedDate = new Date(year, month, day, hour, minute);
          this.props.onConfirm(selectedDate);
          this.props.onHideAfterConfirm(selectedDate);
        } else {
          this.props.onCancel();
        }
      } else {
        this.props.onConfirm(date);
        this.props.onHideAfterConfirm(date);
      }
    } else {
      this.props.onCancel();
    }
  };

  showTimePickerAndroid = async () => {
    let picked;
    try {
      picked = await TimePickerAndroid.open({
        hour: this.props.date.getHours(),
        minute: this.props.date.getMinutes(),
        is24Hour: this.props.is24Hour,
        mode: this.props.timePickerModeAndroid
      });
    } catch ({ message }) {
      console.warn("Cannot open time picker", message);
      return;
    }

    const { action, hour, minute } = picked;
    if (action !== TimePickerAndroid.dismissedAction) {
      let date;
      if (this.props.date) {
        // This prevents losing the Date elements, see issue #71
        const year = this.props.date.getFullYear();
        const month = this.props.date.getMonth();
        const day = this.props.date.getDate();
        date = new Date(year, month, day, hour, minute);
      } else {
        date = new Date().setHours(hour).setMinutes(minute);
      }
      this.props.onConfirm(date);
      this.props.onHideAfterConfirm(date);
    } else {
      this.props.onCancel();
    }
  };

  render() {
    return null;
  }
}
