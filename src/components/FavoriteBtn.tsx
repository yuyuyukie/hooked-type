import React from "react";

type Props = {
  isFavorite: boolean;
  handleClick: (bool: boolean) => void;
};
const FavoriteBtn: React.FC<Props> = ({ isFavorite, handleClick }) => {
  return (
    <div
      className="favoriteBtn"
      style={isFavorite ? { color: "#e0245e" } : { color: "#5b7083" }}
      onClick={() => handleClick(isFavorite)}
    >
      <i className={isFavorite ? "fas fa-heart" : "far fa-heart"}></i>
    </div>
  );
};
export default FavoriteBtn;
