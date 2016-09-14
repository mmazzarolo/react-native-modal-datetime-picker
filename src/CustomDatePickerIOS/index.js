import React, { Component, PropTypes } from 'react'
import { DatePickerIOS, Text, TouchableOpacity, View } from 'react-native'
import CustomModal from '../CustomModal'

import styles from './index.style'

export default class CustomDatePickerIOS extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(['date', 'time']),
    initialDate: PropTypes.object,
    titleIOS: PropTypes.string,
    confirmTextIOS: PropTypes.string,
    cancelTextIOS: PropTypes.string
  }

  static defaultProps = {
    visible: false,
    mode: 'date',
    initialDate: new Date(),
    titleIOS: 'Pick a date',
    confirmTextIOS: 'Confirm',
    cancelTextIOS: 'Cancel'
  }

  state = {
    date: this.props.initialDate
  }

  _handleConfirm = () => this.props.onConfirm(this.state.date)

  _handleDateChange = (date) => this.setState({ date })

  render () {
    const { onCancel, visible, mode, titleIOS, confirmTextIOS, cancelTextIOS, ...otherProps } = this.props
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
