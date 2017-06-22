import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePickerAndroid, TimePickerAndroid } from 'react-native';
import moment from 'moment';

export default class CustomDatePickerAndroid extends Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['date', 'time', 'datetime']),
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onHideAfterConfirm: PropTypes.func,
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
    onHideAfterConfirm: () => {},
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
          const timeOptions = {is24Hour: this.props.is24Hour};
          if (this.props.date) {
            timeOptions.hours = this.props.date.getHours();
            timeOptions.minute = this.props.date.getMinutes();
          }
          const { action: timeAction, hour, minute } = await TimePickerAndroid.open(timeOptions);
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
        this.props.onHideAfterConfirm(date);
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
