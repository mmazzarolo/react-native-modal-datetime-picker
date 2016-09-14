<img src="https://freeiconshop.com/files/edd/calendar-flat.png" width="100" align="left">
# react-native-modal-datetime-picker
A react-native datetime-picker that works on both Android and iOS.
<br/>
<br/>

This library exposes a cross-platform interface for show the native date and time pickers.  
<br/>

## Setup
This library is available on npm, install it with: `npm install --save react-native-modal-datetime-picker`.  

## Usage
```javascript
import React, { Component, PropTypes } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'

export default class DateTimePickerTester extends Component {
  state = {
    isDateTimePickerVisible: false
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date)
    this._hideDateTimePicker()
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={_showDateTimePicker}>
          <Text>Show TimePicker</Text>
        </TouchableOpacity>
        <DateTimePicker
          visible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    )
  }

}
```
<br/>
