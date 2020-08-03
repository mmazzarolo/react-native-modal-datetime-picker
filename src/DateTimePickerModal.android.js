import React, { useEffect, useState, memo } from "react";
import PropTypes from "prop-types";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateTimePickerModal = memo(({
      date, 
      mode,
      isVisible, 
      onCancel, 
      onConfirm,
      onHide, 
      ...otherProps
    }) =>{
      const [currentDate, setCurrentDate] = useState(date);
      const [currentMode, setCurrentMode] = useState(null);

      useEffect(()=>{
        if (isVisible && currentMode === null) {
          setCurrentMode(mode === "time" ? "time" : "date");
        } else if (!isVisible) {
          setCurrentMode(null);
        }
      }, [isVisible, currentMode]);

      if (!isVisible || !currentMode) return null;

      return (
        <DateTimePicker
          {...otherProps}
          mode={currentMode}
          value={currentDate}
          onChange={(event, date) => {
            if (event.type === "dismissed") {
              onCancel();
              onHide(false);
              return;
            }
            let nextDate = date;
            if (mode === "datetime") {
              if (currentMode === "date") {
                setCurrentMode("time")
                setCurrentDate(new Date(date));
                return;
              } else if (currentMode === "time") {
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const day = currentDate.getDate();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                nextDate = new Date(year, month, day, hours, minutes);
              }
            } 
            
            setCurrentDate(nextDate);
            onConfirm(nextDate);
            onHide(true, nextDate);
          }}
        />
      );
  }, 
  (prevProps, nextProps) =>
    prevProps.isVisible === nextProps.isVisible
    && prevProps.date === nextProps.date
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

export {DateTimePickerModal};
