import React, { Component, PropTypes } from 'react'
import { DatePickerAndroid, TimePickerAndroid } from 'react-native'
import moment from 'moment'

export default class CustomDatePickerAndroid extends Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['date', 'time']),
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    visible: PropTypes.bool
  }

  static defaultProps = {
    date: new Date(),
    mode: 'date',
    visible: false
  }

  componentDidUpdate = (prevProps) => {
    if (!prevProps.visible && this.props.visible) {
      if (this.props.mode === 'date') {
        this._showDatePickerAndroid()
      } else {
        this._showTimePickerAndroid()
      }
    }
  }

  _showDatePickerAndroid = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.props.date
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        const date = moment({ year, month, day }).toDate()
        this.props.onConfirm(date)
      } else {
        this.props.onCancel()
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message)
    }
  }

  _showTimePickerAndroid = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: moment(this.props.date).hour(),
        minute: moment(this.props.date).minute(),
        is24Hour: true
      })
      if (action !== TimePickerAndroid.dismissedAction) {
        const date = moment({ hour, minute }).toDate()
        this.props.onConfirm(date)
      } else {
        this.props.onCancel()
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message)
    }
  }

  render () {
    return null
  }
}
