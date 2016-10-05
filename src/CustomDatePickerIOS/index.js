import React, { Component, PropTypes } from 'react'
import { DatePickerIOS, Text, TouchableOpacity, View } from 'react-native'
import CustomModal from '../CustomModal'

import styles from './index.style'

export default class CustomDatePickerIOS extends Component {
  static propTypes = {
    cancelTextIOS: PropTypes.string,
    confirmTextIOS: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['date', 'time', 'datetime']),
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    titleIOS: PropTypes.string,
    visible: PropTypes.bool
  }

  static defaultProps = {
    cancelTextIOS: 'Cancel',
    confirmTextIOS: 'Confirm',
    date: new Date(),
    mode: 'date',
    titleIOS: 'Pick a date',
    visible: false
  }

  state = {
    date: this.props.date
  }

  _handleConfirm = () => this.props.onConfirm(this.state.date)

  _handleDateChange = (date) => this.setState({ date })

  render () {
    const { onCancel, visible, mode, titleIOS, confirmTextIOS, cancelTextIOS, date, ...otherProps } = this.props
    return (
      <CustomModal visible={visible} contentContainerStyle={styles.contentContainer}>
        <View style={styles.datepickerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{titleIOS}</Text>
          </View>
          <DatePickerIOS
            date={this.state.date}
            mode={mode}
            onDateChange={this._handleDateChange}
            {...otherProps}
          />
          <TouchableOpacity style={styles.confirmButton} onPress={this._handleConfirm}>
            <Text style={styles.confirmText}>{confirmTextIOS}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelText}>{cancelTextIOS}</Text>
        </TouchableOpacity>
      </CustomModal>
    )
  }
}
