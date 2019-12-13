// Type definitions for react-native-modal-datetime-picker
// Project: https://github.com/mmazzarolo/react-native-modal-datetime-picker
// Definitions by: Kyle Roach <https://github.com/iRoachie>
// TypeScript Version: 2.3.2

import * as React from "react";
import { ViewStyle, TextStyle } from "react-native";
import { ModalProps } from "react-native-modal";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type ReactNativeModalProps = Omit<ModalProps, "children" | "isVisible">;

export interface DateTimePickerProps {
  /**
   * The text on the cancel button on iOS
   *
   * Default is 'Cancel'
   */
  cancelTextIOS?: string;

  /**
   * The text on the confirm button on iOS
   *
   * Default is 'Confirm'
   */
  confirmTextIOS?: string;

  /**
   * A custom component for the cancel button on iOS
   */
  customCancelButtonIOS?: JSX.Element;

  /**
   * A custom component for the confirm button on iOS
   */
  customConfirmButtonIOS?: JSX.Element;

  /**
   * A custom component for the confirm button on iOS that will be shown while user interacting with the date picker
   *
   * Doesn't work without customConfirmButtonIOS
   */
  customConfirmButtonWhileInteractingIOS?: JSX.Element;

  /**
   * The style of the ReactNativeModal container on iOS
   */
  contentContainerStyleIOS?: ViewStyle;

  /**
   * The style of the cancel button container on iOS
   */
  cancelButtonContainerStyleIOS?: ViewStyle;

  /**
   * Ref function for the React Native DatePickerIOS or a customDatePickerIOS
   */
  pickerRefCb?(ref: any): void;

  /**
   * Props for ReactNativeModal
   */
  reactNativeModalPropsIOS?: ReactNativeModalProps;

  /**
   * A custom style for the titleIOS (Default is 'Pick a Date')
   */
  titleStyle?: TextStyle;

  /**
   * A custom style for the confirmTextIOS (Default is 'Confirm')
   *
   * Doesn't work with the customConfirmButtonIOS
   */
  confirmTextStyle?: TextStyle;

  /**
   * A custom style for cancelTextIOS (Default is 'Cancel')
   *
   * Doesn't work with the customCancelButtonIOS
   */
  cancelTextStyle?: TextStyle;

  /**
   * Never disable the confirm button on iOS, even on fling (see #82)
   *
   * Default is false
   */
  neverDisableConfirmIOS?: boolean;

  /**
   * A custom component for the title container on iOS
   */
  customTitleContainerIOS?: JSX.Element;

  /**
   * Dismiss the date-picker/time-picker when pressing on the backdrop (on iOS)?
   *
   * Default is true
   */
  dismissOnBackdropPressIOS?: boolean;

  /**
   * Hide the title container on iOS
   *
   * Default is false
   */
  hideTitleContainerIOS?: boolean;

  /**
   * A custom component that will replace the default DatePicker on iOS
   */
  customDatePickerIOS?: JSX.Element;

  /**
   * The style of the container on iOS
   */
  datePickerContainerStyleIOS?: ViewStyle;

  /**
   * Initial selected date/time
   *
   * Default is a date object from `new Date()`
   */
  date?: Date;

  /**
   * The date picker locale.
   */
  locale?: string;

  /**
   * Toggles the dark mode style of the picker
   *
   * Default is false
   */
  isDarkModeEnabled?: boolean;

  /**
   * Sets the visibility of the picker
   *
   * Default is false
   */
  isVisible?: boolean;

  /**
   * Sets mode to 24 hour time
   * If false, the picker shows an AM/PM chooser on Android
   *
   * Default is true
   */
  is24Hour?: boolean;

  /**
   *  The mode of the picker
   *
   * Available modes are:
   *  date - Shows Datepicker
   *  time - Shows Timepicker
   *  datetime - Shows a combined Date and Time Picker
   *
   * Default is 'date'
   */
  mode?: "date" | "time" | "datetime";

  /**
   * Toggles the date mode on Android between spinner and calendar views
   *
   * Default is 'default' which shows either spinner or calendar based on Android version
   */
  datePickerModeAndroid?: "spinner" | "calendar" | "default";

  /**
   * Toggles the time mode on Android between spinner and clock views
   *
   * Default is 'default' which shows either spinner or clock based on Android version
   */
  timePickerModeAndroid?: "spinner" | "clock" | "default";

  /**
   * Title text for the Picker on iOS
   *
   * Default is 'Pick a Date'
   */
  titleIOS?: string;

  /**
   * Minimum date the picker can go back to
   */
  minimumDate?: Date;

  /**
   * Maximum date the picker can go forward to
   */
  maximumDate?: Date;

  /**
   *  enum(1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30)
   *  The interval at which minutes can be selected.
   *
   * @extends from DatePickerIOSProperties
   */
  minuteInterval?: number;

  /**
   * Timezone offset in minutes.
   * By default, the date picker will use the device's timezone. With this parameter, it is possible to force a certain timezone offset.
   * For instance, to show times in Pacific Standard Time, pass -7 * 60.
   *
   * @extends from DatePickerIOSProperties
   */
  timeZoneOffsetInMinutes?: number;

  /**
   * Date change handler.
   * This is called when the user changes the date or time in the UI.
   * The first and only argument is a Date object representing the new date and time.
   *
   * @extends from DatePickerIOSProperties
   */
  onDateChange?(newDate: Date): void;

  /**
   * Handler called when the user presses the confirm button
   * Passes the current selected date
   */
  onConfirm(date: Date): void;

  /**
   * Handler called when the user presses the cancel button
   * Passes the current selected date
   */
  onCancel(date: Date): void;

  /**
   * Called when the underlying modal finishes its' closing animation
   * after Confirm was pressed.
   */
  onHideAfterConfirm?(date: Date): void;
}

export default class DateTimePicker extends React.Component<
  DateTimePickerProps,
  any
  > { }
