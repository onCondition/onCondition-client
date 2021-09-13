import axios from "../api/axiosInstance";

const useMock = true;

const numbers = 16;

const mockUser = {
  profileUrl: "https://lh3.googleusercontent.com/a/AATXAJyVWL-UkAOLeLY75qUbVwQWvUt1RDWk60KkzICi=s96-c0",
  name: "user mock",
  score: 9,
  lastAccessData: "2021-09-12",
};

const mockUsers = [...Array(numbers)].map((_, i) => {
  return { ...mockUser, _id: `id${i}`, stroke: i };
});

const BASE = "/api";

function joinUrl(...args) {
  return args.join("/");
}

async function getFriends(creatorId) {
  if (useMock) {
    return {
      friends: mockUsers,
      sendingRequest: mockUsers,
      receivingRequest: mockUsers,
    };
  }

  const res = await axios.get(joinUrl(BASE, creatorId, "friends"));

  if (res) {
    return res.data;
  }
}

async function updateFriendRequest(creatorId, friendId, isAccepted) {
  if (useMock) {
    console.log(friendId + " accepted " + isAccepted);

    return { result: "ok" };
  }

  const res = await axios.patch(joinUrl(BASE, creatorId, "friends"), { friendId, isAccepted });

  if (res) {
    return res;
  }
}

export { getFriends, updateFriendRequest };
