import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { fetchUsers } from "api/api";
import TweetsItem from "components/TweetsItem/TweetsItem";
import css from "./TweetsList.module.css";

const TweetsList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [selectedValue, setSelectedValue] = useState("All");
  // const [isFollowed, setIsFollowed] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchUsers(page);
      setData((prevData) => [...prevData, ...response.data]);
      if (response.data.length > 5) {
        setLoadMore(true);
      } else {
        setLoadMore(false);
      }
    };

    fetchData();
  }, [page]);

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const handleGoBack = () => navigate("/");

  const onSelect = (e) => {
    if (e.target.value === "true") {
      setSelectedValue(true);
    }
    if (e.target.value === "false") {
      setSelectedValue(false);
    }
    if (e.target.value === "All") {
      setSelectedValue("All");
    }
  };

  return (
    <>
      <div className={css.selectContainer}>
        <button type="button" className={css.goHomeBtn} onClick={handleGoBack}>
          <MdKeyboardBackspace width={100} height={100} /> GoHome
        </button>
        <select
          value={selectedValue}
          onChange={onSelect}
          className={css.filter}
        >
          <option value="All">All</option>
          <option value={true}>Following</option>
          <option value={false}>Follow</option>
        </select>
      </div>
      {data.length !== 0 && (
        <ul className={css.tweetsList}>
          {selectedValue === "All" &&
            data.map(({ id, user, tweets, followers, avatar }) => (
              <TweetsItem
                key={id}
                id={id}
                user={user}
                tweets={tweets}
                followers={followers}
                avatar={avatar}
              />
            ))}
          {selectedValue !== "All" &&
            data
              .filter(({ isFollow }) => isFollow === selectedValue)
              .map(({ id, user, tweets, followers, avatar }) => (
                <TweetsItem
                  key={id}
                  id={id}
                  user={user}
                  tweets={tweets}
                  followers={followers}
                  avatar={avatar}
                />
              ))}
        </ul>
      )}
      {loadMore && (
        <div className={css.btnContainer}>
          <button
            className={css.loadMoreBtn}
            type="button"
            onClick={onLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default TweetsList;
