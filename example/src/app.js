import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import styles from "./app.style";

export default class DateTimePickerTester extends Component {
  state = {
    isDateTimePickerVisible: false,
    selectedDate: ""
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ selectedDate: date.toString() });
    this._hideDateTimePicker();
  };

  render() {
    const { isDateTimePickerVisible, selectedDate } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <View style={styles.button}>
            <Text>Show DatePicker</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.text}>{selectedDate}</Text>

        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  }
}
