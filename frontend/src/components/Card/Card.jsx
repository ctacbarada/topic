import React from "react";
import "./Card.css";

export default function Card({ card, onCardClick, index, tweetInfo }) {
  // console.log("tweetInfo", tweetInfo);

  function handleClick() {
    onCardClick(card);
  }

  return (
    <div
      className={`card ${"area" + index}`}
      style={{ gridArea: `area${index}` }}
    >
      <img
        src={card.url}
        className="card__image"
        alt="card"
        onClick={handleClick}
      />
      <p>haha</p>
    </div>
  );
}
