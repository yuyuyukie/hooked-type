import React, { useState } from "react";

type Props = {
  search: (searchValue: string) => void;
};

export const Search: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchInputChanges = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchValue(e.target.value);
  };
  const resetInputField = (): void => {
    setSearchValue("");
  };
  const callSearchFunction = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ): void => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  };
  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  );
};
