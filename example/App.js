import React, { useState } from "react";
import { Button, Platform, StyleSheet, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const App = () => {
  const [pickerMode, setPickerMode] = useState(null);

  const showDatePicker = () => {
    setPickerMode("date");
  };

  const showTimePicker = () => {
    setPickerMode("time");
  };
  const showDurationPicker = () => {
    setPickerMode("countdown");
  };

  const hidePicker = () => {
    setPickerMode(null);
  };

  const handleConfirm = date => {
    console.warn("A date has been picked: ", date);
    hidePicker();
  };

  const durationButton =
    Platform.OS === "ios" ? (
      <Button title="Show Countdown Picker" onPress={showDurationPicker} />
    ) : (
      <View />
    );
  return (
    <View style={style.root}>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <Button title="Show Time Picker" onPress={showTimePicker} />
      {durationButton}
      <DateTimePickerModal
        isVisible={pickerMode !== null}
        date={pickerMode === "countdown" ? new Date(1000) : new Date()}
        mode={pickerMode}
        timeZoneOffsetInMinutes={0}
        onConfirm={handleConfirm}
        onCancel={hidePicker}
      />
    </View>
  );
};

const style = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default App;
