import React, { useEffect, useRef, useState, memo } from "react";
import PropTypes from "prop-types";
import DateTimePicker from "@react-native-community/datetimepicker";

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.isVisible === nextProps.isVisible &&
    prevProps.date.getTime() === nextProps.date.getTime()
  );
};

const DateTimePickerModal = memo(
  ({ date, mode, isVisible, onCancel, onConfirm, onHide, ...otherProps }) => {
    const currentDateRef = useRef(date);
    const [currentMode, setCurrentMode] = useState(null);

    useEffect(() => {
      if (isVisible && currentMode === null) {
        setCurrentMode(mode === "time" ? "time" : "date");
      } else if (!isVisible) {
        setCurrentMode(null);
      }
    }, [isVisible, currentMode, mode]);

    if (!isVisible || !currentMode) return null;

    const handleChange = (event, selectedDate) => {
      if (event.type === "dismissed") {
        onCancel();
        onHide(false);
        return;
      }

      let nextDate = selectedDate;
      if (mode === "datetime") {
        if (currentMode === "date") {
          setCurrentMode("time");
          currentDateRef.current = new Date(selectedDate);
          return;
        } else if (currentMode === "time") {
          const year = currentDateRef.current.getFullYear();
          const month = currentDateRef.current.getMonth();
          const day = currentDateRef.current.getDate();
          const hours = selectedDate.getHours();
          const minutes = selectedDate.getMinutes();
          nextDate = new Date(year, month, day, hours, minutes);
        }
      } else if (mode === "monthyears") {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        nextDate = new Date(year, month);
      }

      onConfirm(nextDate);
      onHide(true, nextDate);
    };

    return (
      <DateTimePicker
        {...otherProps}
        mode={currentMode}
        value={date}
        onChange={handleChange}
      />
    );
  },
  areEqual
);

DateTimePickerModal.propTypes = {
  date: PropTypes.instanceOf(Date),
  isVisible: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onHide: PropTypes.func,
  maximumDate: PropTypes.instanceOf(Date),
  minimumDate: PropTypes.instanceOf(Date),
};

DateTimePickerModal.defaultProps = {
  date: new Date(),
  isVisible: false,
  onHide: () => {},
};

export { DateTimePickerModal };
