import type { FC } from "react";

interface IEventSearchProps {
  searchValue: string;
  onChange: (value: string) => void;
}

export const EventSearch: FC<IEventSearchProps> = ({
  searchValue,
  onChange,
}) => {
  return (
    <input
      className="mb-6 p-2 border"
      placeholder="Search a movie"
      type="search"
      value={searchValue}
      onChange={(event) => onChange(event.target.value)}
    ></input>
  );
};
