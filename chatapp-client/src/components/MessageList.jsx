import React, { useState, useEffect } from "react";
import axios from "axios";

const MessageList = ({ channelId, username }) => {
  const [messages, setMessages] = useState([]);
  const [newMessageContent, setNewMessageContent] = useState("");
  const [editMessageId, setEditMessageId] = useState(null);
  const [editMessageContent, setEditMessageContent] = useState("");

  useEffect(() => {
    async function fetchMessages() {
      const response = await axios.get(`/api/messages?channelId=${channelId}`);
      setMessages(response.data);
    }

    fetchMessages();
  }, [channelId]);

  const handleAddMessage = async () => {
    await axios.post("/api/messages", {
      channelId,
      username,
      content: newMessageContent,
    });
    setNewMessageContent("");
    const response = await axios.get(`/api/messages?channelId=${channelId}`);
    setMessages(response.data);
  };

  const handleEditMessage = async (id) => {
    const messageToUpdate = messages.find((message) => message.id === id);
    if (messageToUpdate) {
      messageToUpdate.content = editMessageContent;
      await axios.put(`/api/messages/${id}`, messageToUpdate);
      setEditMessageId(null);
      setEditMessageContent("");
      const response = await axios.get(`/api/messages?channelId=${channelId}`);
      setMessages(response.data);
    }
  };

  const handleDeleteMessage = async (id) => {
    await axios.delete(`/api/messages/${id}`);
    const response = await axios.get(`/api/messages?channelId=${channelId}`);
    setMessages(response.data);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 bg-gray-100 overflow-y-scroll">
        <h3 className="text-lg font-bold">Messages</h3>
        <ul className="flex flex-col flex-wrap mb-10">
          {messages.map((message) => (
            <li key={message.id} className="mb-4">
              <span className="text-sm font-bold">{message.username}</span>
              <div className="flex">
                <p className="p-2 w-72 break-words rounded-md bg-white text-gray-800 shadow-sm">
                  {message.content}
                </p>
                {editMessageId === message.id ? (
                  <div className="flex ml-4 items-center">
                    <input
                      type="text"
                      className="rounded-md border-gray-400 border px-2 py-1 text-sm mr-2 shadow-sm h-full"
                      value={editMessageContent}
                      onChange={(e) => setEditMessageContent(e.target.value)}
                    />
                    <button
                      className="px-2 py-1 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-600 shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditMessage(message.id);
                      }}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex ml-4 items-start">
                    {message.username === username && (
                      <button
                        className="px-2 py-1 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-600 mr-2 shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditMessageId(message.id);
                          setEditMessageContent(message.content);
                        }}
                      >
                        Edit
                      </button>
                    )}
                    {message.username === username && (
                      <button
                        className="px-2 py-1 rounded-md bg-red-500 text-white font-bold hover:bg-red-600 shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMessage(message.id);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="sticky bottom-0 p-4 bg-gray-200">
        <div className="flex">
          <input
            type="text"
            placeholder="Type your message"
            className="flex-1 rounded-md border-gray-400 border px-2 py-1 text-sm mr-2 shadow-sm h-full"
            value={newMessageContent}
            onChange={(e) => setNewMessageContent(e.target.value)}
          />
          <button
            className="px-4 py-1 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-600 shadow-sm"
            onClick={handleAddMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default MessageList;
