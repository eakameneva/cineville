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
    <div className="px-6 mb-4 max-w-4xl mx-auto">
      <label
        htmlFor="movie-search"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Search a movie
      </label>
      <input
        id="movie-search"
        className="w-full max-w-md p-2 border border-gray-300 rounded-md"
        placeholder="Type a movie title..."
        type="search"
        value={searchValue}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};
