import React, { useEffect, useRef, useState, memo } from "react";
import PropTypes from "prop-types";
import DateTimePicker from "@react-native-community/datetimepicker";

// Memo workaround for https://github.com/react-native-community/datetimepicker/issues/54
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.isVisible === nextProps.isVisible &&
    (prevProps.date?.getTime() === nextProps.date?.getTime())
  );
};

const DateTimePickerModal = memo(
  ({
    date = new Date(),
    mode = 'date',
    isVisible = false,
    onCancel,
    onConfirm,
    onHide = () => { },
    ...otherProps
  }) => {
    const currentDateRef = useRef(date);
    const [currentMode, setCurrentMode] = useState(null);

    useEffect(() => {
      if (isVisible && currentMode === null) {
        setCurrentMode(mode === 'time' ? 'time' : 'date');
      } else if (!isVisible) {
        setCurrentMode(null);
      }
    }, [isVisible, currentMode, mode]);

    if (!isVisible || !currentMode) return null;

    const handleChange = (event, date) => {
      if (event.type === 'dismissed') {
        onCancel();
        onHide(false);
        return;
      }
      let nextDate = date;
      if (mode === 'datetime') {
        if (currentMode === 'date') {
          setCurrentMode('time');
          currentDateRef.current = new Date(date);
          return;
        } else if (currentMode === 'time') {
          const year = currentDateRef.current.getFullYear();
          const month = currentDateRef.current.getMonth();
          const day = currentDateRef.current.getDate();
          const hours = date.getHours();
          const minutes = date.getMinutes();
          nextDate = new Date(year, month, day, hours, minutes);
        }
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

export default DateTimePickerModal;

DateTimePickerModal.propTypes = {
  date: PropTypes.instanceOf(Date),
  isVisible: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onHide: PropTypes.func,
  maximumDate: PropTypes.instanceOf(Date),
  minimumDate: PropTypes.instanceOf(Date),
};

export { DateTimePickerModal };