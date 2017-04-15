import React, { Component, PropTypes } from 'react';
import { DatePickerAndroid, TimePickerAndroid } from 'react-native';
import moment from 'moment';

export default class CustomDatePickerAndroid extends Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['date', 'time', 'datetime']),
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    is24Hour: PropTypes.bool,
    isVisible: PropTypes.bool,
    datePickerModeAndroid: PropTypes.oneOf(['calendar', 'spinner', 'default']),
    minimumDate: PropTypes.instanceOf(Date),
    maximumDate: PropTypes.instanceOf(Date),
  };

  static defaultProps = {
    date: new Date(),
    mode: 'date',
    datePickerModeAndroid: 'calendar',
    is24Hour: true,
    isVisible: false,
  };

  componentDidUpdate = prevProps => {
    if (!prevProps.isVisible && this.props.isVisible) {
      if (this.props.mode === 'date' || this.props.mode === 'datetime') {
        this._showDatePickerAndroid();
      } else {
        this._showTimePickerAndroid();
      }
    }
  };

  _showDatePickerAndroid = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.props.date,
        minDate: this.props.minimumDate,
        maxDate: this.props.maximumDate,
        mode: this.props.datePickerModeAndroid,
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const date = moment({ year, month, day }).toDate();

        if (this.props.mode === 'datetime') {
          // Prepopulate and show time picker
          const timeOptions = !this.props.date
            ? {}
            : { hour: this.props.date.getHours(), minute: this.props.date.getMinutes() };

          TimePickerAndroid.open(timeOptions).then(({ timeAction, minute, hour }) => {
            if (timeAction !== TimePickerAndroid.dismissedAction) {
              const selectedDate = new Date(year, month, day, hour, minute);
              this.props.onConfirm(selectedDate);
            } else {
              this.props.onCancel();
            }
          });
        } else {
          this.props.onConfirm(date);
        }
      } else {
        this.props.onCancel();
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  _showTimePickerAndroid = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: moment(this.props.date).hour(),
        minute: moment(this.props.date).minute(),
        is24Hour: this.props.is24Hour,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        const date = moment({ hour, minute }).toDate();
        this.props.onConfirm(date);
      } else {
        this.props.onCancel();
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  };

  render() {
    return null;
  }
}
