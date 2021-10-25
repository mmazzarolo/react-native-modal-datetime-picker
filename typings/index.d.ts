// Type definitions for react-native-modal-datetime-picker
// Project: https://github.com/mmazzarolo/react-native-modal-datetime-picker
// Definitions by:
// Kyle Roach <https://github.com/iRoachie>
// Michiel De Mey <https://github.com/MichielDeMey>
// TypeScript Version: 3.5

import * as React from "react";
import { ViewStyle } from "react-native";
import {
  IOSNativeProps,
  AndroidNativeProps,
} from "@react-native-community/datetimepicker";

export type CancelButtonComponent = React.ComponentType<{
  isDarkModeEnabled: boolean;
  onPress(): void;
  label: string;
}>;

export type ConfirmButtonComponent = React.ComponentType<{
  isDisabled: boolean;
  onPress(): void;
  label: string;
}>;

export type HeaderComponent = React.ComponentType<{
  label: string;
}>;

export type PickerComponent = React.ComponentType<IOSNativeProps>;

export interface DateTimePickerProps {
  /**
   * The prop to locate cancel button for e2e testing
   */
  cancelButtonTestID?: string;

  /**
   * The prop to locate confirm button for e2e testing
   */
  confirmButtonTestID?: string;

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
  customCancelButtonIOS?: CancelButtonComponent;

  /**
   * A custom component for the confirm button on iOS
   */
  customConfirmButtonIOS?: ConfirmButtonComponent;

  /**
   * A custom component for the title container on iOS
   */
  customHeaderIOS?: HeaderComponent;

  /**
   * A custom component that will replace the default DatePicker on iOS
   */
  customPickerIOS?: PickerComponent;

  /**
   * Style of the backgrop (iOS)
   */
  backdropStyleIOS?: ViewStyle;

  /**
   * Style of the modal content (iOS)
   */
  modalStyleIOS?: ViewStyle;

  /**
   * The style of the picker container (iOS)
   */
  pickerContainerStyleIOS?: ViewStyle;

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
   * If not set, the picker tries to use the color-scheme from the Appearance module, if available.
   *
   * Default is undefined
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
   * Additional modal props for iOS.
   *
   * See https://reactnative.dev/docs/modal for the available props.
   */
  modalPropsIOS?: Object;

  /**
   * Toggles the time mode on Android between spinner and clock views
   *
   * Default is 'default' which shows either spinner or clock based on Android version
   */
  timePickerModeAndroid?: "spinner" | "clock" | "default";

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
   */
  onChange?(newDate: Date): void;

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
  onHide?(date: Date): void;

  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
}

export type ReactNativeModalDateTimePickerProps = DateTimePickerProps &
  Omit<IOSNativeProps, "value" | "mode" | "onChange"> &
  Omit<AndroidNativeProps, "value" | "mode" | "onChange">;

export default class DateTimePicker extends React.Component<
  ReactNativeModalDateTimePickerProps,
  any
> {}
