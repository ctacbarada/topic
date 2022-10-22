import React, { useEffect } from "react";
import { useState } from "react";
import { TweetsApi } from "../../api/tweetsApi";
import { linkContext } from "../../utils/LinkContext";
import Card from "../Card/Card";
import "./Cards.css";

export default function Cards({ onCardClick }) {
  const [tweet, setTweet] = useState([]);
  const headerLink = React.useContext(linkContext);

  useEffect(() => {
    TweetsApi.getTweets(headerLink ? headerLink : "#sitnikfriday")
      .then((res) => {
        console.log("RES", res);
        const mediaAndTweetId = res.data.map((data) => {
          const mediaKeys = {};
          if (data.attachments) {
            // very rare the attachments don't coming from API
            for (let i = 0; i < data.attachments.media_keys.length; i++) {
              mediaKeys[i] = data.attachments.media_keys[i];
            }
            return {
              ...mediaKeys,
              tweetId: data.id,
            };
          } else {
            for (let i = 0; i < data.entities.urls.length; i++) {
              mediaKeys[i] = data.entities.urls[i];
            }
            return {
              ...mediaKeys,
              tweetId: data.id,
            };
          }
        });

        const userName = mediaAndTweetId.map((el, i) => {
          return { ...el, ...res.includes.users[i] };
        });

        const tweetInfo = res.includes.media.map((item) => {
          return {
            ...userName.filter((el) =>
              Object.values(el).some((media) => {
                return media === item.media_key;
              })
            ),
            ...item,
          };
        });
        setTweet(tweetInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [headerLink]);

  return (
    <section className="cards">
      {tweet.map((card, i) => (
        <Card key={i} card={card} onCardClick={onCardClick} index={i} />
      ))}
    </section>
  );
}
