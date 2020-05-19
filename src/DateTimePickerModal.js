import React from "react";
import { Platform } from "react-native";

export default function DateTimePickerModal() {
  React.useEffect(() => {
    console.warn(`DateTimePicker is not supported on: ${Platform.OS}`);
  }, []);
  return null;
}
