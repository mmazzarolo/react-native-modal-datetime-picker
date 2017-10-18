# react-native-modal-datetime-picker

[![npm version](https://badge.fury.io/js/react-native-modal-datetime-picker.svg)](https://badge.fury.io/js/react-native-modal-datetime-picker)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A declarative cross-platform react-native datetime-picker.
  
## Description

This library exposes a cross-platform interface for showing the native date and time pickers inside a modal.  
You will have an unified user experience, you won't have to worry anymore about testing the device platform and you won't have to programmatically call the Android TimePicker/DatePicker APIs.


## Demo

<p align="center">
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-modal-datetime-picker/master/extras/datetimepicker-android.gif" />
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-modal-datetime-picker/master/extras/datetimepicker-ios.gif" />
</p>

## Setup

This library is available on npm, install it with `npm install --save react-native-modal-datetime-picker` or `yarn add react-native-modal-datetime-picker`.

## Usage

```javascript
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class DateTimePickerTester extends Component {
  state = {
    isDateTimePickerVisible: false,
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

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
    );
  }

}
```

## Available props

| Name | Type| Default | Description |
| --- | --- | --- | --- |
| cancelTextIOS | string | 'Cancel' | The text on the cancel button on iOS |  
| cancelTextStyle | style |  | The style of the cancel button text on iOS |
| confirmTextIOS | string | 'Confirm' | The text on the confirm button on iOS |
| confirmTextStyle | style |  | The style of the confirm button text on iOS |
| customCancelButtonIOS | node |  | A custom component for the cancel button on iOS |
| customConfirmButtonIOS | node |  | A custom component for the confirm button on iOS |
| neverDisableConfirmIOS | bool | false | If true, do not disable the confirm button on any touch events; see [#82](https://github.com/mmazzarolo/react-native-modal-datetime-picker/issues/82) |
| customTitleContainerIOS | node |  | A custom component for the title container on iOS |
| datePickerContainerStyleIOS | style |  | The style of the container on iOS |
| reactNativeModalPropsIOS | object |  | Additional props for [react-native-modal](https://github.com/react-native-community/react-native-modal) on iOS |
| date | obj | new Date() | Initial selected date/time |
| isVisible | bool | false | Show the datetime picker? |
| mode | string | 'date' | Datepicker? 'date' Timepicker? 'time' Both? 'datetime' |
| datePickerModeAndroid | string | 'calendar' | Display as 'spinner' or 'calendar'|
| onConfirm | func | **REQUIRED** | Function called on date picked |
| onHideAfterConfirm | func | () => {} | Called after the hiding animation if a date was picked |
| onCancel | func | **REQUIRED** |  Function called on dismiss |
| titleIOS | string | 'Pick a date' | The title text on iOS |
| titleStyle | style |  | The style of the title text on iOS |
| minimumDate | Date | undefined | Min Date. Does not work with 'time' picker on Android. |
| maximumDate | Date | undefined | Max Date. Does not work with 'time' picker on Android. |
| is24Hour | bool | true | If false, the picker shows an AM/PM chooser on Android |

All the [DatePickerIOS props](https://facebook.github.io/react-native/docs/datepickerios.html) are also supported!  

## Notes

Just remember to always set the `isVisible` prop to `false` in both `onConfirm` and `onCancel` (like in the example above).

Under the hood this library is using [react-native-modal](https://github.com/react-native-community/react-native-modal) for the iOS modal implementation.  

Pull requests and suggestions are welcome!
