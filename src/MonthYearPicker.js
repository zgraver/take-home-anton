import React, { useState } from "react";
import moment from "moment";

const MonthYearPicker = ({ timelogs, onChange }) => {
  const [selectedMonthYear, setSelectedMonthYear] = useState(
    moment().format("MM/YY")
  );

  const handleMonthYearChange = (newMonthYear) => {
    setSelectedMonthYear(newMonthYear);
    onChange(newMonthYear);
  };

  const uniqueMonths = timelogs
    .map((log) => moment(log.timestamp).format("MM/YY"))
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div className="month-year-picker">
      Filter issues by month:{" "}
      <span className="clickable" onClick={() => handleMonthYearChange(null)}>
        all months
      </span>
      <div className="months">
        {uniqueMonths.map((month, i) => (
          <div
            key={month}
            className={`clickable month ${
              selectedMonthYear === month ? "active" : ""
            }`}
            onClick={() =>
              month === selectedMonthYear
                ? handleMonthYearChange(null)
                : handleMonthYearChange(month)
            }
          >
            {month}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthYearPicker;
