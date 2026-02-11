import { format, isToday } from "date-fns";

import type { ChangeEvent, FC } from "react";

const DAY_OPTION_AMOUNT = 7;
const FULL_DAY_HOURS = 24;
const EVENT_START_HOUR = 9;

const selectStyles =
  "rounded-md px-3 py-2 cursor-pointer border border-gray-300";

const getDayOptionTitle = (date: Date, index: number) => {
  if (index === 0) {
    return "TODAY";
  }

  return format(date, "d MMM");
};

const getDayFilterOptions = () => {
  const dayOptions = Array.from({ length: DAY_OPTION_AMOUNT });

  return dayOptions.map((_, index) => {
    const date = new Date();

    date.setDate(date.getDate() + index);

    return {
      value: format(date, "yyyy-MM-dd"),
      title: getDayOptionTitle(date, index),
    };
  });
};

const getStartHour = (dateFilterValue: Date) => {
  const date = new Date();

  if (isToday(dateFilterValue)) {
    return date.getHours();
  }

  return EVENT_START_HOUR;
};

const getTimeOptionTitle = (
  index: number,
  dateFilterValue: Date,
  hours: number
) => {
  if (index === 0 && isToday(dateFilterValue)) {
    return "NOW";
  } else if (index === 0) {
    return "ALL DAY";
  }

  return `${hours}:00`;
};

const getTimeFilterOptions = (dateFilterValue: Date) => {
  const startHour = getStartHour(dateFilterValue);
  const hourOptions = Array.from({ length: FULL_DAY_HOURS - startHour });

  return hourOptions.map((_, index) => {
    const value = startHour + index;

    return {
      value,
      title: getTimeOptionTitle(index, dateFilterValue, value),
    };
  });
};

interface IEventFiltersProps {
  dateFilterValue: Date;
  onDateFilterValueChange: (value: Date) => void;
}

export const EventFilters: FC<IEventFiltersProps> = ({
  dateFilterValue,
  onDateFilterValueChange,
}) => {
  const getIsCurrentHourSelected = (selectedDate: Date) => {
    const currentDate = new Date();
    const selectedHours = selectedDate.getHours();

    return isToday(selectedDate) && currentDate.getHours() === selectedHours;
  };

  const handleFilterChange = (date: Date, hours: number) => {
    const newDate = new Date(date);

    newDate.setHours(hours);

    if (getIsCurrentHourSelected(newDate)) {
      onDateFilterValueChange(new Date());
      return;
    }

    onDateFilterValueChange(newDate);
  };

  const handleDaysFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(event.target.value);

    handleFilterChange(newDate, getStartHour(newDate));
  };

  const handleTimeFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const dateWithNewTime = new Date(dateFilterValue);

    handleFilterChange(dateWithNewTime, +event.target.value);
  };

  return (
    <div className="flex gap-4 sticky top-0 bg-[#fffbf4] py-4 px-6 z-10">
      <select
        name="days"
        value={format(dateFilterValue, "yyyy-MM-dd")}
        onChange={handleDaysFilterChange}
        className={selectStyles}
      >
        {getDayFilterOptions().map((day) => {
          return (
            <option key={day.value} value={day.value}>
              {day.title}
            </option>
          );
        })}
      </select>
      <select
        name="time"
        value={dateFilterValue.getHours()}
        onChange={handleTimeFilterChange}
        className={selectStyles}
      >
        {getTimeFilterOptions(dateFilterValue).map((time) => {
          return (
            <option key={time.value} value={time.value}>
              {time.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};
