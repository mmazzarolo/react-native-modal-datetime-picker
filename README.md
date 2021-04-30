# react-native-modal-datetime-picker

[![npm version](https://badge.fury.io/js/react-native-modal-datetime-picker.svg)](https://badge.fury.io/js/react-native-modal-datetime-picker)
![Supports Android and iOS](https://img.shields.io/badge/platforms-android%20|%20ios-lightgrey.svg)

A declarative cross-platform react-native date and time picker.

<p align="center">
<img src="./.github/images/datetimepicker-android.gif" height="400" />
<img src="./.github/images/datetimepicker-ios.gif" height="400" />
</p>

This library exposes a cross-platform interface for showing the native date-picker and time-picker inside a modal, providing a unified user and developer experience.

Under the hood this library is using [`@react-native-community/datetimepicker`](https://github.com/react-native-community/react-native-datetimepicker).

## Setup (for non-Expo projects)

If your project is not using [Expo](https://expo.io/), install the library and the community date/time picker using npm or yarn:

```bash
# using npm
$ npm i react-native-modal-datetime-picker @react-native-community/datetimepicker

# using yarn
$ yarn add react-native-modal-datetime-picker @react-native-community/datetimepicker
```

Please notice that the `@react-native-community/datetimepicker` package is a native module so [**it might require manual linking**](https://github.com/react-native-community/react-native-datetimepicker#getting-started).

## Setup (for Expo projects)

If your project is using [Expo](https://expo.io/), install the library and the community date/time picker using the [Expo CLI](https://docs.expo.io/versions/latest/workflow/expo-cli/):

```bash
expo install react-native-modal-datetime-picker @react-native-community/datetimepicker
```

## Usage

```javascript
import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Example = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <View>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default Example;
```

## Available props

| Name                    | Type      | Default       | Description                                                                                         |
| ----------------------- | --------- | ------------- | --------------------------------------------------------------------------------------------------- |
| cancelTextIOS           | string    | 'Cancel'      | The label of the cancel button (iOS)                                                                |
| confirmTextIOS          | string    | 'Confirm'     | The label of the confirm button (iOS)                                                               |
| customCancelButtonIOS   | component |               | Overrides the default cancel button component (iOS)                                                 |
| customConfirmButtonIOS  | component |               | Overrides the default confirm button component (iOS)                                                |
| customHeaderIOS         | component |               | Overrides the default header component (iOS)                                                        |
| customPickerIOS         | component |               | Overrides the default native picker component (iOS)                                                 |
| date                    | obj       | new Date()    | Initial selected date/time                                                                          |
| headerTextIOS           | string    | "Pick a date" | The title text of header (iOS)                                                                      |
| isVisible               | bool      | false         | Show the datetime picker?                                                                           |
| isDarkModeEnabled       | bool?     | undefined     | Forces the picker dark/light mode if set (otherwise fallbacks to the Appearance color scheme) (iOS) |
| isHeaderVisibleIOS      | bool?     | false         | Show the built-in header on iOS                                                                     |
| modalPropsIOS           | object    | {}            | Additional [modal](https://reactnative.dev/docs/modal) props for iOS                                |
| modalStyleIOS           | style     |               | Style of the modal content (iOS)                                                                    |
| mode                    | string    | "date"        | Choose between 'date', 'time', and 'datetime'                                                       |
| onCancel                | func      | **REQUIRED**  | Function called on dismiss                                                                          |
| onConfirm               | func      | **REQUIRED**  | Function called on date or time picked. It returns the date or time as a JavaScript Date object     |
| onHide                  | func      | () => null    | Called after the hide animation                                                                     |
| pickerContainerStyleIOS | style     |               | The style of the picker container (iOS)                                                             |

👉 Please notice that **all the [`@react-native-community/react-native-datetimepicker`](https://github.com/react-native-community/react-native-datetimepicker) props are also supported**!

## Frequently Asked Questions

### The component is not working as expected

Under the hood `react-native-modal-datetime-picker` uses [`@react-native-community/datetimepicker`](https://github.com/react-native-community/react-native-datetimepicker).
Before reporting a bug, try swapping `react-native-datetime-picker` with [`@react-native-community/datetimepicker`](https://github.com/react-native-community/react-native-datetimepicker) and, if the issue persists, check if it has already been reported as a an issue there.

### How can I show the timepicker instead of the datepicker?

Set the `mode` prop to `time`.
You can also display both the datepicker and the timepicker in one step by setting the `mode` prop to `datetime`.

### I can't set the initial date on the picker

Please make sure you're using the `date` props (and not the `value` one).

### The picker shows up twice on Android

This seems to be a known issue of the [`@react-native-community/datetimepicker`](https://github.com/react-native-community/datetimepicker/issues/54). Please see [this thread](https://github.com/react-native-community/datetimepicker/issues/54) for a couple of workarounds. The solution, as described in [this reply](https://github.com/react-native-datetimepicker/datetimepicker/issues/54#issuecomment-618776550) is hiding the modal, **before doing anything else**.

<details><summary><strong>Example of solution using Input + DatePicker</strong></summary>
<p>
The most common approach for solving this issue when using an <code>Input</code> is:
<ul>
  <li>Wrap your <code>Input</code> with a "<code>Pressable</code>"/<code>Button</code> (<code>TouchableWithoutFeedback</code>/<code>TouchableOpacity</code> + <code>activeOpacity={1}</code> for example)</li>
  <li>Prevent <code>Input</code> from being focused. You could set <code>editable={false}</code> too for preventing Keyboard opening</li>
  <li>Triggering your <code>hideModal()</code> callback as a first thing inside <code>onConfirm</code>/<code>onCancel</code> callback props</li>
</ul>

```jsx
const [isVisible, setVisible] = useState(false);
const [date, setDate] = useState('');

<TouchableOpacity
  activeOpaticy={1}
  onPress={() => setVisible(true)}>
  <Input
    value={value}
    editable={false} // optional
  />
</TouchableOpacity>
<DatePicker
  isVisible={isVisible}
  onConfirm={(date) => {
    setVisible(false); // <- first thing
    setValue(parseDate(date));
  }}
  onCancel={() => setVisible(false)}
/>
```

</p>
</details>

### How can I set a minimum and/or maximum date?

You can use the [`minimumDate`](https://github.com/react-native-datetimepicker/datetimepicker#minimumdate-optional) and [`maximumDate`](https://github.com/react-native-datetimepicker/datetimepicker#maximumdate-optional) props from [`@react-native-community/datetimepicker`](https://github.com/react-native-community/react-native-datetimepicker).

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

### How can I set an automatic locale in iOS

The datepicker can adjust by itself the locale (`fr_FR`, `en_GB`...) depending on the user's device locale.
To do so, edit your `AppDelegate.m` file and add the following to `didFinishLaunchingWithOptions`.

```objc
// Force DatePicker locale to current language (for: 24h or 12h format, full day names etc...)
NSString *currentLanguage = [[NSLocale preferredLanguages] firstObject];
[[UIDatePicker appearance] setLocale:[[NSLocale alloc]initWithLocaleIdentifier:currentLanguage]];
```

### The picker is not showing the right layout on iOS >= 14

Please make sure you're on the latest version of `react-native-modal-datetime-picker` and of the [`@react-native-community/datetimepicker`](https://github.com/react-native-community/datetimepicker).
[We already closed several iOS 14 issues that were all caused by outdated/cached versions of the community datetimepicker](https://github.com/mmazzarolo/react-native-modal-datetime-picker/issues?q=%22ios+14%22).

### I can't show an alert after the picker has been hidden (on iOS)

Unfortunately this is a know issue with React-Native on iOS. Even by using the `onHide` callback exposed by `react-native-modal-datetime-picker` you might not be able to show the (native) alert successfully. The only workaround that seems to work consistently for now is to wrap showing the alter in a setTimeout 😔:

```js
const handleHide = () => {
  setTimeout(() => Alert.alert("Hello"), 0);
};
```

See issue [#512](https://github.com/mmazzarolo/react-native-modal-datetime-picker/issues/512) for more info.

### The date in `onConfirm` doesn't match the picked date (on iOS)

On iOS, clicking the "Confirm" button while the spinner is still in motion — even just _slightly_ in motion — will cause the `onConfirm` callback to return the initial date instead of the picked one. This is is a long standing iOS issue (that can happen even on native app like the iOS calendar) and there's no failproof way to fix it on the JavaScript side.  
See [this GitHub gist](https://gist.github.com/SudoPlz/6959001879fbfcc7e2aa42a428a5265c) for an example of how it might be solved at the native level — but keep in mind it won't work on this component until it has been merged into the official React-Native repo.

Related issue in the React-Native repo [here](https://github.com/facebook/react-native/issues/8169).

### How do I make it work with snapshot testing?

See issue [#216](https://github.com/mmazzarolo/react-native-modal-datetime-picker/issues/216) for a possible workaround.

## Contributing

Please see the [contributing guide](./.github/CONTRIBUTING.md).

## License

The library is released under the MIT license. For more details see [`LICENSE`](/LICENSE.md).
