const CHAT_SERVER = process.env.CHAT_SERVER_URI;
export const chatService = {
  getAllPrivateChats: async (senderId, receiverId) => {
    return fetch("http://localhost:8080/api/chats/getAll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sender: senderId, receiver: receiverId }),
    });
  },
};
