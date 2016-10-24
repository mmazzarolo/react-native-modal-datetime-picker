import React, { Component, PropTypes } from 'react'
import { DatePickerIOS, Text, TouchableOpacity, View } from 'react-native'
import AnimatedModal from 'react-native-animated-modal'

import styles from './index.style'

export default class CustomDatePickerIOS extends Component {
  static propTypes = {
    cancelTextIOS: PropTypes.string,
    confirmTextIOS: PropTypes.string,
    customCancelButtonIOS: PropTypes.node,
    customConfirmButtonIOS: PropTypes.node,
    customTitleContainerIOS: PropTypes.node,
    datePickerContainerStyleIOS: View.propTypes.style,
    date: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['date', 'time', 'datetime']),
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    titleIOS: PropTypes.string,
    isVisible: PropTypes.bool
  }

  static defaultProps = {
    cancelTextIOS: 'Cancel',
    confirmTextIOS: 'Confirm',
    date: new Date(),
    mode: 'date',
    titleIOS: 'Pick a date',
    isVisible: false
  }

  state = {
    date: this.props.date
  }

  _handleConfirm = () => this.props.onConfirm(this.state.date)

  _handleDateChange = (date) => this.setState({ date })

  render () {
    const { onCancel, isVisible, mode, titleIOS, confirmTextIOS, cancelTextIOS, customCancelButtonIOS,
      customConfirmButtonIOS, customTitleContainerIOS, datePickerContainerStyleIOS,
      date, ...otherProps } = this.props

    const titleContainer = (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{titleIOS}</Text>
      </View>
    )
    const confirmButton = (
      <View style={styles.confirmButton}>
        <Text style={styles.confirmText}>{confirmTextIOS}</Text>
      </View>
    )
    const cancelButton = (
      <View style={styles.cancelButton}>
        <Text style={styles.cancelText}>{cancelTextIOS}</Text>
      </View>
    )
    return (
      <AnimatedModal isVisible={isVisible} style={styles.contentContainer}>
        <View style={[styles.datepickerContainer, datePickerContainerStyleIOS]}>
          {customTitleContainerIOS || titleContainer}
          <DatePickerIOS
            date={this.state.date}
            mode={mode}
            onDateChange={this._handleDateChange}
            {...otherProps}
          />
          <TouchableOpacity onPress={this._handleConfirm}>
            {customConfirmButtonIOS || confirmButton}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          {customCancelButtonIOS || cancelButton}
        </TouchableOpacity>
      </AnimatedModal>
    )
  }
}
