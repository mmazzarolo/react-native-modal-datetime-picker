import React, {Component, PropTypes} from "react";
import {DatePickerIOS, Text, TouchableOpacity, View} from "react-native";
import CustomModal from "../CustomModal";
import styles from "./index.style";

export default class CustomDatePickerIOS extends Component {
    static propTypes = {
        cancelTextIOS: PropTypes.string,
        confirmTextIOS: PropTypes.string,
        date: PropTypes.instanceOf(Date),
        mode: PropTypes.oneOf(['date', 'time', 'datetime']),
        onConfirm: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        titleIOS: PropTypes.string,
        visible: PropTypes.bool,
        backgroundColorIOS: PropTypes.string,
        titleContainerStyleIOS: View.propTypes.style,
        titleStyleIOS: Text.propTypes.style,
        confirmButtonStyleIOS: View.propTypes.style,
        confirmButtonTextStyleIOS: Text.propTypes.style,
        cancelButtonStyleIOS: View.propTypes.style,
        cancelButtonTextStyleIOS: Text.propTypes.style
    }

    static defaultProps = {
        cancelTextIOS: 'Cancel',
        confirmTextIOS: 'Confirm',
        date: new Date(),
        mode: 'date',
        titleIOS: 'Pick a date',
        visible: false,
        backgroundColorIOS : '#f9f9f9',
        titleContainerStyleIOS: styles.titleContainer,
        titleStyleIOS: styles.title,
        confirmButtonStyleIOS: styles.confirmButton,
        confirmButtonTextStyleIOS: styles.confirmText,
        cancelButtonStyleIOS: styles.cancelButton,
        cancelButtonTextStyleIOS: styles.cancelText
    }

    state = {
        date: this.props.date
    }

    _handleConfirm = () => this.props.onConfirm(this.state.date)

    _handleDateChange = (date) => this.setState({date})

    render() {
        const {
            visible,
            backgroundColorIOS,
            titleContainerStyleIOS,
            titleStyleIOS,
            titleIOS,
            date,
            mode,
            confirmButtonStyleIOS,
            confirmButtonTextStyleIOS,
            confirmTextIOS,
            cancelButtonStyleIOS,
            onCancel,
            cancelButtonTextStyleIOS,
            cancelTextIOS,
            ...otherProps
        } = this.props

        return (
            <CustomModal visible={visible} contentContainerStyle={styles.contentContainer}>
                <View style={[styles.datepickerContainer, {backgroundColor: backgroundColorIOS}]}>
                    <View style={[styles.titleContainer, titleContainerStyleIOS]}>
                        <Text style={[styles.title, titleStyleIOS]}>{titleIOS}</Text>
                    </View>
                    <DatePickerIOS
                        date={this.state.date}
                        mode={mode}
                        onDateChange={this._handleDateChange}
                        {...otherProps}
                    />
                    <TouchableOpacity style={[styles.confirmButton, confirmButtonStyleIOS]} onPress={this._handleConfirm}>
                        <Text style={[styles.confirmText, confirmButtonTextStyleIOS]}>{confirmTextIOS}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.cancelButton, cancelButtonStyleIOS]} onPress={onCancel}>
                        <Text style={[styles.cancelText, cancelButtonTextStyleIOS]}>{cancelTextIOS}</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>
        )
    }
}
