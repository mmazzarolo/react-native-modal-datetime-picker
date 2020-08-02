import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateTimePickerModal = ({
    date, 
    mode,
    isVisible, 
    onCancel, 
    onConfirm,
    onHide, 
    ...otherProps
  }) =>{
    const [currentDate, setCurrentDate] = useState(date);
    const [currentMode, setCurrentMode] = useState(mode === "time" ? "time" : "date");
    
    useEffect(()=>{
      if (isVisible && currentMode === null) {
        setCurrentMode(mode === "time" ? "time" : "date");
      } else if (!isVisible) {
        setCurrentMode(null);
      }
    }, [isVisible, currentMode]);

    if (!isVisible || !currentMode) return null;

    console.log(currentDate)
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
          if (mode === "datetime") {
            let nextDate = date;
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
          setCurrentDate(nextDate)      
          onConfirm(nextDate);
          onHide(true, nextDate);
        }}
      />
    );
};

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
