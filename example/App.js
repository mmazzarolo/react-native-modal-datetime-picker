import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const App = () => {
  const [pickerMode, setPickerMode] = useState(null);
  const [androidType, setAndroidType] = useState('default');

  const showDatePicker = () => {
    setPickerMode("date");
  };

  const showTimePicker = () => {
    setPickerMode("time");
  };

  const showDateTimePicker = () => {
    setPickerMode("datetime");
  };

  const hidePicker = () => {
    setPickerMode(null);
  };

  const handleConfirm = date => {
    console.warn("A date has been picked: ", date);
    hidePicker();
  };

  const toggleType = () => {
    if (androidType === 'default') {
      setAndroidType('spinner')
    } else {
      setAndroidType('default')
    }
  }

  return (
    <View style={style.root}>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <Button title="Show Time Picker" onPress={showTimePicker} />
      <Button title="Show DateTime Picker" onPress={showDateTimePicker} />
      <Button title={`Android only Toggle type ${androidType}`} onPress={toggleType} />
      <DateTimePickerModal
        isVisible={pickerMode !== null}
        mode={pickerMode}
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        display={androidType}
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
