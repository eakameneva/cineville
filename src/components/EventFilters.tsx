import type { FC } from "react";
import { format, isToday } from "date-fns";

const DAY_OPTION_AMOUNT = 7;
const FULL_DAY_HOURS = 24;
const EVENT_START_HOUR = 9;

const getDayFilterOptions = () => {
  const dayOptions = new Array(DAY_OPTION_AMOUNT).fill(null);

  return dayOptions.map((_, index) => {
    const date = new Date();
    let title = "";

    date.setDate(date.getDate() + index);

    if (index === 0) {
      title = "TODAY";
    } else {
      title = format(date, "d MMM");
    }

    return { value: format(date, "yyyy-MM-dd"), title };
  });
};

const getTimeFilterOptions = (dateFilterValue: Date) => {
  const date = new Date();
  let startHour = EVENT_START_HOUR;
  const isTodayFilterSelected = isToday(dateFilterValue);

  if (isTodayFilterSelected) {
    startHour = date.getHours();
  }
  const hourOptions = new Array(FULL_DAY_HOURS - startHour).fill(null);

  return hourOptions.map((_, index) => {
    let title = "";
    const optionHours = startHour + index;

    if (index === 0) {
      title = isTodayFilterSelected ? "NOW" : "ALL DAY";
    } else {
      title = `${optionHours}:00`;
    }
    return { value: optionHours, title };
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
  return (
    <div>
      <select
        name="days"
        onChange={(event) => {
          onDateFilterValueChange(new Date(event.target.value));
        }}
      >
        {getDayFilterOptions().map((day) => {
          return (
            <option
              value={day.value}
              selected={day.value === format(dateFilterValue, "yyyy-MM-dd")}
            >
              {day.title}
            </option>
          );
        })}
      </select>

      <select
        name="time"
        onChange={(event) => {
          const dateWithNewTime = new Date(dateFilterValue);
          dateWithNewTime.setHours(+event.target.value);
          onDateFilterValueChange(dateWithNewTime);
        }}
      >
        {getTimeFilterOptions(dateFilterValue).map((time) => {
          return (
            <option
              value={time.value}
              selected={time.value === dateFilterValue.getHours()}
            >
              {time.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};
