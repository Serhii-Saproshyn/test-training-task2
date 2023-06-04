import axios from "axios";

const BASE_URL = "https://646a7db97d3c1cae4ce29c5f.mockapi.io/users/";

export const fetchUsers = async (page, limit = 6) => {
  return await axios.get(BASE_URL, {
    params: {
      page,
      limit,
    },
  });
};

export const putFollowers = async (id, followers, isFollow) => {
  try {
    return await axios.put(`${BASE_URL}${id}`, {
      followers,
      isFollow,
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
};
