import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class DateTimePickerTester extends Component {
  state = {
    isDateTimePickerVisible: false,
    selectedDate: ""
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.setState({ selectedDate: date.toString() });
    this.hideDateTimePicker();
  };

  render() {
    const { isDateTimePickerVisible, selectedDate } = this.state;

    return (
      <View style={styles.container}>
        <Button title="Show DatePicker" onPress={this.showDateTimePicker} />
        <Text style={styles.text}>{selectedDate}</Text>
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    marginVertical: 10
  }
});
