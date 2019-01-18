# react-native-modal-datetime-picker

[![npm version](https://badge.fury.io/js/react-native-modal-datetime-picker.svg)](https://badge.fury.io/js/react-native-modal-datetime-picker)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


A declarative cross-platform react-native datetime-picker.

## Description

This library exposes a cross-platform interface for showing the native date-picker and time-picker inside a modal.
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
          <Text>Show DatePicker</Text>
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
| hideTitleContainerIOS | bool | false | If true, hide the modal title container on iOS |
| customDatePickerIOS | node |  | A custom component that will replace the default DatePicker on iOS [(Example)](https://github.com/mmazzarolo/react-native-modal-datetime-picker/pull/115#issue-279547697)|
| datePickerContainerStyleIOS | style |  | The style of the container on iOS |
| reactNativeModalPropsIOS | object |  | Additional props for [react-native-modal](https://github.com/react-native-community/react-native-modal) on iOS |
| date | obj | new Date() | Initial selected date/time |
| isVisible | bool | false | Show the datetime picker? |
| mode | string | 'date' | Datepicker? 'date' Timepicker? 'time' Both? 'datetime' |
| datePickerModeAndroid | string | 'calendar' | Display as 'spinner' or 'calendar'|
| onConfirm | func | **REQUIRED** | Function called on date or time picked. It returns the date or time as a JavaScript Date object |
| onHideAfterConfirm | func | () => {} | Called after the hiding animation if a date was picked |
| pickerRefCb | func |  | Called after picker has mounted, contains a ref |
| onCancel | func | **REQUIRED** |  Function called on dismiss |
| titleIOS | string | 'Pick a date' | The title text on iOS |
| titleStyle | style |  | The style of the title text on iOS |
| minimumDate | Date | undefined | Min Date. Does not work with 'time' picker on Android |
| maximumDate | Date | undefined | Max Date. Does not work with 'time' picker on Android |
| is24Hour | bool | true | If false, the picker shows an AM/PM chooser on Android |
| minuteInterval | integer | 1 | Interval for [time picker](https://github.com/mmazzarolo/react-native-modal-datetime-picker/pull/131) on iOS |

All the [DatePickerIOS props](https://facebook.github.io/react-native/docs/datepickerios.html) are also supported!

## Frequently Asked Questions

### The component is not working as expected
Under the hood `react-native-modal-datetime-picker` uses react-native original [DatePickerAndroid](https://facebook.github.io/react-native/docs/datepickerandroid.html), [TimePickerAndroid](https://facebook.github.io/react-native/docs/timepickerandroid.html) and [DatePickerIOS](https://facebook.github.io/react-native/docs/datepickerios.html).
Before reporting a bug, try swapping `react-native-datetime-picker` with react-native original date/time pickers and, if the issue persists, check if it has already been reported as a [react-native issue](https://github.com/facebook/react-native/issues).

### How can I show the timepicker instead of the datepicker?
Just set the `mode` prop to `time`.
You can also display both the datepicker and the timepicker in one step by setting the `mode` prop to `datetime`.

### Why is the selected start date being shown in the input field of the end date?
If you have both a start date/time and end date/time picker on the same screen, you will need to have `showDateTimePicker`, `hideDateTimePicker`, and `handleDatePicked` functions for both.

```javascript
showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });

showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });

hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });

handleStartDatePicked = (date) => {
  console.log('A date has been picked: ', date);
  this.hideStartDateTimePicker();
};

handleEndDatePicked = (date) => {
  console.log('A date has been picked: ', date);
  this.hideEndDateTimePicker();
};
```

### How do I change the color of the Android date and time pickers?  
This is more a React-Native specific question than a react-native-modal-datetime-picker one.  
See issue [#29](https://github.com/mmazzarolo/react-native-modal-datetime-picker/issues/29) and [#106](https://github.com/mmazzarolo/react-native-modal-datetime-picker/issues/106) for some solutions.  

### How to set 24 hours in iOS ?
The `is24Hour` prop is only available on Android but you use a small hack for enabling it on iOS by setting the app's default timezone as `en_GB`.
To do so, edit your `AppDelegate.m` file, and add `[[UIDatePicker appearance] setLocale:[[NSLocale alloc]initWithLocaleIdentifier:@"en_GB"]];` to `application didFinishLaunchingWithOptions`

### How to set automatic locale in iOS
Datepicker can adjust by itself locale ("fr_FR", "en_GB"...) depending user's device locale.
Edit your `AppDelegate.m` file, and add:

```objc
  // Force DatePicker locale to current language (for: 24h or 12h format, full day names etc...)
  NSString *currentLanguage = [[NSLocale preferredLanguages] firstObject];
  [[UIDatePicker appearance] setLocale:[[NSLocale alloc]initWithLocaleIdentifier:currentLanguage]];
```

### How do I make it work with snapshot testing?  
See issue [#216](https://github.com/mmazzarolo/react-native-modal-datetime-picker/issues/216) for a possible workaround.

## Notes
Remember to always set the `isVisible` prop to `false` in both the `onConfirm` and `onCancel` props (like in the example above).

Under the hood this library is using [react-native-modal](https://github.com/react-native-community/react-native-modal) for the iOS modal implementation.

Pull requests and suggestions are always welcome!
