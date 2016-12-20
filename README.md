<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-modal-datetime-picker/master/extras/logo.png" width="110" align="left">
# react-native-modal-datetime-picker
A react-native datetime-picker that works on both Android and iOS.
<br/>
<br/>

## Description
This library exposes a cross-platform interface for showing the native date and time pickers inside a modal.  
You will have an unified user experience, you won't have to worry anymore about testing the device platform and you won't have to programmatically call the Android TimePicker/DatePicker APIs.
<br/>

## Setup
This library is available on npm, install it with: `npm install --save react-native-modal-datetime-picker`.  

## GIFs!
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-modal-datetime-picker/master/extras/datetimepicker-android.gif">
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-modal-datetime-picker/master/extras/datetimepicker-ios.gif">

## Usage
```javascript
import React, { Component } from 'react'
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
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>Show TimePicker</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    )
  }

}
```
<br/>

## Available props
| Name | Type| Default | Description |
| --- | --- | --- | --- |
| cancelTextIOS | string | 'Cancel' | The text on the cancel button on iOS |  
| confirmTextIOS | string | 'Confirm' | The text on the confirm button on iOS |
| customCancelButtonIOS | node |  | A custom component for the cancel button on iOS |
| customConfirmButtonIOS | node |  | A custom component for the confirm button on iOS |
| customTitleContainerIOS | node |  | A custom component for the title container on iOS |
| datePickerContainerStyleIOS | style |  | The style of the container on iOS |
| date | obj | new Date() | Initial selected date/time |
| isVisible | bool | false | Show the datetime picker? |
| mode | string | 'date' | Datepicker? 'date' Timepicker? 'time' Both? 'datetime' |
| onConfirm | func | **REQUIRED** | Function called on date picked |
| onCancel | func | **REQUIRED** |  Function called on dismiss |
| titleIOS | string | 'Pick a date' | The title text on iOS |
| minimumDate | Date | undefined | Min Date
| maximumDate | Date | undefined | Max Date
| is24Hour | bool | true | If false, the picker shows an AM/PM chooser on Android |

All the [DatePickerIOS props](https://facebook.github.io/react-native/docs/datepickerios.html) are also supported!  

## Notes
Just remember to always set the `isVisible` prop to `false` in both `onConfirm` and `onCancel` (like in the example above).

Under the hood this library is using [react-native-animated-modal](https://github.com/mmazzarolo/react-native-animated-modal) for the iOS modal implementation.  

Pull request and suggestions are welcome!
