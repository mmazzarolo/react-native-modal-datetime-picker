import React, { useState } from "react";
import { Button, Platform, StyleSheet, Switch, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const App = () => {
  const [pickerMode, setPickerMode] = useState(null);
  const [inline, setInline] = useState(false);

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

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hidePicker();
  };

  return (
    <View style={style.root}>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <Button title="Show Time Picker" onPress={showTimePicker} />
      <Button title="Show DateTime Picker" onPress={showDateTimePicker} />
      {Platform.OS === "ios" && (
        <View style={style.inlineSwitchContainer}>
          <Text style={style.inlineSwitchText}>Display inline?</Text>
          <Switch value={inline} onValueChange={setInline} />
        </View>
      )}
      <DateTimePickerModal
        isVisible={pickerMode !== null}
        mode={pickerMode}
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        display={inline ? "inline" : undefined}
      />
    </View>
  );
};

const style = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inlineSwitchContainer: {
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
  },
  inlineSwitchText: {
    fontSize: 18,
    marginRight: 8,
  },
});

export default App;
