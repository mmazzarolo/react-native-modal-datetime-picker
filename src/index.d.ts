// Type definitions for react-native-modal-datetime-picker
// Project: https://github.com/mmazzarolo/react-native-modal-datetime-picker
// Definitions by: Kyle Roach <https://github.com/iRoachie>
// TypeScript Version: 2.3.2

import * as React from 'react'
import { ViewStyle } from 'react-native'

interface DateTimePickerProps {
    /**
     * The text on the cancel button on iOS
     * 
     * Default is 'Cancel'
     */
    cancelTextIOS?: string

    /**
     * The text on the confirm button on iOS
     * 
     * Default is 'Confirm'
     */
    confirmTextIOS?: string

    /**
     * A custom component for the cancel button on iOS
     */
    customCancelButtonIOS?: JSX.Element

    /**
     * A custom component for the confirm button on iOS
     */
    customConfirmButtonIOS?: JSX.Element
    
    /**
     * Never disable the confirm button on iOS, even on fling (see #82)
     *
     * Default is false
     */
     neverDisableConfirmIOS?: boolean

    /**
     * A custom component for the title container on iOS
     */
    customTitleContainerIOS?: JSX.Element

    /**
     * The style of the container on iOS
     */
    datePickerContainerStyleIOS?: ViewStyle

    /**
     * Initial selected date/time
     * 
     * Default is a date object from `new Date()`
     */
    date?: Date

    /**
     * Sets the visibility of the picker
     * 
     * Default is false
     */
    isVisible?: boolean

    /**
     * Sets mode to 24 hour time
     * If false, the picker shows an AM/PM chooser on Android
     * 
     * Default is true
     */
    is24Hour?: boolean

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
    mode?: 'date' | 'time' | 'datetime'

    /**
     * Toggles the date mode on Android between spinner and calendar views
     * 
     * Default is 'calendar'
     */
    datePickerModeAndroid?: 'spinner' | 'calendar'

    /**
     * Title text for the Picker on iOS
     * 
     * Default is 'Pick a Date'
     */
    titleIOS?: string

    /**
     * Minimum date the picker can go back to
     */
    minimumDate?: Date

    /**
     * Maximum date the picker can go forward to
     */
    maximumDate?: Date

    /**
     *  enum(1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30)
     *  The interval at which minutes can be selected.
     * 
     * @extends from DatePickerIOSProperties
     */
    minuteInterval?: number

    /**
     * Timezone offset in minutes.
     * By default, the date picker will use the device's timezone. With this parameter, it is possible to force a certain timezone offset.
     * For instance, to show times in Pacific Standard Time, pass -7 * 60.
     * 
     * @extends from DatePickerIOSProperties
     */
    timeZoneOffsetInMinutes?: number

    /**
     * Date change handler.
     * This is called when the user changes the date or time in the UI.
     * The first and only argument is a Date object representing the new date and time.
     * 
     * @extends from DatePickerIOSProperties
     */
    onDateChange?( newDate: Date ): void

    /**
     * Handler called when the user presses the confirm button
     * Passes the current selected date
     */
    onConfirm(date: Date): void

    /**
     * Handler called when the user presses the cancel button
     * Passes the current selected date
     */
    onCancel(date: Date): void


    /**
     * Called when the underlying modal finishes its' closing animation
     * after Confirm was pressed.
     */
    onHideAfterConfirm?(date: Date): void
}

export default class DateTimePicker extends React.Component<DateTimePickerProps, any> { }
