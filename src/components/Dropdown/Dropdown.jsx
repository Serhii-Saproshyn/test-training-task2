import React, { useState } from "react";

const Dropdown = ({ tweets }) => {
  const [filter, setFilter] = useState("show all");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTweets = tweets.filter((tweet) => {
    if (filter === "follow") {
      return tweet.status === "follow";
    } else if (filter === "followings") {
      return tweet.status === "following";
    } else {
      return true;
    }
  });

  return (
    <div>
      <label htmlFor="filter">Filter: </label>
      <select id="filter" value={filter} onChange={handleFilterChange}>
        <option value="show all">Show All</option>
        <option value="follow">Follow</option>
        <option value="followings">Followings</option>
      </select>

      <ul>
        {filteredTweets.map((tweet) => (
          <li key={tweet.id}>{tweet.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
