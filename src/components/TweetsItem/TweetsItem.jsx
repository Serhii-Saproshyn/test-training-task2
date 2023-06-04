import css from "./TweetsItem.module.css";
import goIt from "images/goIt.png";
import mainImg from "images/mainImg.png";
import { useState } from "react";

import { putFollowers } from "api/api";

const TweetsItem = ({ id, user, tweets, followers, avatar }) => {
  const isUserFollowing = localStorage.getItem(id)
    ? JSON.parse(localStorage.getItem(id)).isFollowing
    : false;
  const [isFollowing, setIsFollowing] = useState(isUserFollowing);
  const [currentFollowers, setCurrentFollowers] = useState(followers);

  const handleFollowClick = () => {
    setIsFollowing(true);
    localStorage.setItem(
      id,
      JSON.stringify({
        isFollowing: true,
      })
    );
    const newFollowers = currentFollowers + 1;
    const newFollow = true;
    setCurrentFollowers(newFollowers);
    putFollowers(id, newFollowers, newFollow);
  };

  const handleUnfollowClick = () => {
    setIsFollowing(false);
    localStorage.setItem(
      id,
      JSON.stringify({
        isFollowing: false,
      })
    );
    const newFollowers = currentFollowers - 1;
    setCurrentFollowers(newFollowers);
    const newFollow = false;
    putFollowers(id, newFollowers, newFollow);
  };

  const formattedFollowers = currentFollowers.toLocaleString("en-US");

  return (
    <li className={css.profile}>
      <img src={goIt} alt="goIt logo" className={css.logoWrapper} />
      <img src={mainImg} alt="main img" className={css.hero} />

      <div className={css.divider}></div>

      <div className={css.elipseBox}>
        <div className={css.elipse}>
          <img className={css.userImage} src={avatar} alt={user} />
        </div>
      </div>

      <div className={css.bottomContainer}>
        <p className={css.textParagraph}>{tweets} tweets</p>
        <p className={css.textParagraph}>{formattedFollowers} followers</p>

        {isFollowing || isUserFollowing ? (
          <button
            type="button"
            className={css.followBtnActive}
            onClick={handleUnfollowClick}
          >
            Following
          </button>
        ) : (
          <button
            type="button"
            className={css.followBtn}
            onClick={handleFollowClick}
          >
            Follow
          </button>
        )}
      </div>
    </li>
  );
};

export default TweetsItem;
