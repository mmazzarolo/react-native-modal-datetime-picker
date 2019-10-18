# react-native-modal-datetime-picker

[![npm version](https://badge.fury.io/js/react-native-modal-datetime-picker.svg)](https://badge.fury.io/js/react-native-modal-datetime-picker)
![Supports Android and iOS](https://img.shields.io/badge/platforms-android%20|%20ios-lightgrey.svg)

A declarative cross-platform react-native datetime-picker.

<p align="center">
<img src="./.github/images/datetimepicker-android.gif" />
<img src="./.github/images/datetimepicker-ios.gif" />
</p>

This library exposes a cross-platform interface for showing the native date-picker and time-picker inside a modal, providing a unified user and developer experience.

Under the hood this library is using [react-native-modal](https://github.com/react-native-community/react-native-modal) for the iOS modal implementation.

# ⚠️ NEW RELEASE INCOMING (v8)

Hey 👋!  
The react-native date and time pickers have recently been moved to a new [`@react-native-community`](https://github.com/react-native-community/react-native-datetimepicker) repository.  
If you're installing `react-native-modal-datetime-picker` for the first time it is highly recommended to install the new latest pre-release, which is compatible with the `@react-native-community` pickers.  
To do so, please follow [this README.md](https://github.com/mmazzarolo/react-native-modal-datetime-picker/blob/next-major/README.md) instructions and ignore all the steps below.  

If you're a long-time `react-native-modal-datetime-picker` user, please notice that there are some breaking changes in the new release.  

For more info please see [#301](https://github.com/mmazzarolo/react-native-modal-datetime-picker/issues/301). 


# V7 (Stable version) Instructions

## Setup

Install the library using npm or yarn:

```bash
# using npm
$ npm install react-native-modal-datetime-picker --save

# using yarn
$ yarn add react-native-modal-datetime-picker
```

## Usage

```javascript
import React, { Component } from "react";
import { Button, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class DateTimePickerTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false
    };
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };

  render() {
    return (
      <>
        <Button title="Show DatePicker" onPress={this.showDateTimePicker} />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </>
    );
  }
}
```

## Available props

| Name                        | Type   | Default       | Description                                                                                                                                                               |
| --------------------------- | ------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cancelTextIOS               | string | 'Cancel'      | The text on the cancel button on iOS                                                                                                                                      |
| cancelTextStyle             | style  |               | The style of the cancel button text on iOS                                                                                                                                |
| confirmTextIOS              | string | 'Confirm'     | The text on the confirm button on iOS                                                                                                                                     |
| confirmTextStyle            | style  |               | The style of the confirm button text on iOS                                                                                                                               |
| customCancelButtonIOS       | node   |               | A custom component for the cancel button on iOS                                                                                                                           |
| customConfirmButtonIOS      | node   |               | A custom component for the confirm button on iOS                                                                                                                          |
| customDatePickerIOS         | node   |               | A custom component that will replace the default DatePicker on iOS [(Example)](https://github.com/mmazzarolo/react-native-modal-datetime-picker/pull/115#issue-279547697) |
| customTitleContainerIOS     | node   |               | A custom component for the title container on iOS                                                                                                                         |
| date                        | obj    | new Date()    | Initial selected date/time                                                                                                                                                |
| datePickerContainerStyleIOS | style  |               | The style of the container on iOS                                                                                                                                         |
| datePickerModeAndroid       | string | 'default'     | Display as 'spinner' or 'calendar' or 'default' (based on Android version)                                                                                                |
| dismissOnBackdropPressIOS   | bool   | true          | Dismiss the picker on backdrop press (on iOS)?                                                                                                                            |
| hideTitleContainerIOS       | bool   | false         | If true, hide the modal title container on iOS                                                                                                                            |
| is24Hour                    | bool   | true          | If false, the picker shows an AM/PM chooser on Android                                                                                                                    |
| isDarkModeEnabled           | bool   | false         | Is the dark mode enabled?                                                                                                                                                 |
| isVisible                   | bool   | false         | Show the datetime picker?                                                                                                                                                 |
| maximumDate                 | Date   | undefined     | Max Date. Does not work with 'time' picker on Android                                                                                                                     |
| minimumDate                 | Date   | undefined     | Min Date. Does not work with 'time' picker on Android                                                                                                                     |
| minuteInterval              | number | 1             | Interval for [time picker](https://github.com/mmazzarolo/react-native-modal-datetime-picker/pull/131) on iOS                                                              |
| mode                        | string | 'datetime'    | Choose between 'date', 'time', and 'datetime'                                                                                                                     |
| neverDisableConfirmIOS      | bool   | false         | If true, do not disable the confirm button on any touch events; see [#82](https://github.com/mmazzarolo/react-native-modal-datetime-picker/issues/82)                     |
| onCancel                    | func   | **REQUIRED**  | Function called on dismiss                                                                                                                                                |
| onConfirm                   | func   | **REQUIRED**  | Function called on date or time picked. It returns the date or time as a JavaScript Date object                                                                           |
| onHideAfterConfirm          | func   | () => {}      | Called after the hiding animation if a date was picked                                                                                                                    |
| pickerRefCb                 | func   |               | Called after picker has mounted, contains a ref                                                                                                                           |
| reactNativeModalPropsIOS    | object |               | Additional props for [react-native-modal](https://github.com/react-native-community/react-native-modal) on iOS                                                            |
| timePickerModeAndroid       | string | 'default'     | Display as 'spinner' or 'clock' or 'default' (based on Android version)                                                                                                   |
| titleIOS                    | string | 'Pick a date' | The title text on iOS                                                                                                                                                     |
| titleStyle                  | style  |               | The style of the title text on iOS                                                                                                                                        |

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
showStartDateTimePicker = () =>
  this.setState({ startDateTimePickerVisible: true });

showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

hideStartDateTimePicker = () =>
  this.setState({ startDateTimePickerVisible: false });

hideEndDateTimePicker = () =>
  this.setState({ endDateTimePickerVisible: false });

handleStartDatePicked = date => {
  console.log("A date has been picked: ", date);
  this.hideStartDateTimePicker();
};

handleEndDatePicked = date => {
  console.log("A date has been picked: ", date);
  this.hideEndDateTimePicker();
};
```

### How do I change the color of the Android date and time pickers?

This is more a React-Native specific question than a react-native-modal-datetime-picker one.  
See issue [#29](https://github.com/mmazzarolo/react-native-modal-datetime-picker/issues/29) and [#106](https://github.com/mmazzarolo/react-native-modal-datetime-picker/issues/106) for some solutions.

### How to set 24 hours in iOS ?

The `is24Hour` prop is only available on Android but you can use a small hack for enabling it on iOS by setting the picker timezone to `en_GB`:
```js
<DatePicker
  mode="time"
  locale="en_GB" // Use "en_GB" here
  date={new Date()}
/>
```

### How to set automatic locale in iOS

Datepicker can adjust by itself locale (`fr_FR`, `en_GB`...) depending user's device locale.
Edit your `AppDelegate.m` file, and add:

```objc
// Force DatePicker locale to current language (for: 24h or 12h format, full day names etc...)
NSString *currentLanguage = [[NSLocale preferredLanguages] firstObject];
[[UIDatePicker appearance] setLocale:[[NSLocale alloc]initWithLocaleIdentifier:currentLanguage]];
```

### I can't see the picker on iOS / the picker is white on iOS

You're app is probably running in dark mode, which is [not supported by React-Native for the pickers yet](https://github.com/facebook/react-native/issues/26299).   
For a workaround, see the "Is the iOS dark mode supported?" section below 👇

### Is the iOS dark mode supported?

iOS 13 dark mode is not supported out-of-the-box yet and requires a bit of manual setup:
1. Install and link [react-native-appearance](https://github.com/expo/react-native-appearance)
2. Use it to detect the device color scheme: `const colorScheme = Appearance.getColorScheme();`
3. Use the color scheme to enable/disable the `react-native-modal-datetime-picker` dark mode trough the `isDarkModeEnabled` prop: `isDarkModeEnabled: colorScheme === 'dark'`  
  
### How do I make it work with snapshot testing?

See issue [#216](https://github.com/mmazzarolo/react-native-modal-datetime-picker/issues/216) for a possible workaround.

## Contributing

Please see the [contributing guide](./.github/CONTRIBUTING.md).

## License

The library is released under the MIT license. For more information see [`LICENSE`](/LICENSE.md).
