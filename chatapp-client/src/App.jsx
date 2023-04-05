import React, { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import ChannelList from "./components/ChannelList";
import MessageList from "./components/MessageList";

const App = () => {
  const [connection, setConnection] = useState(null);
  const [channelId, setChannelId] = useState(null);
  const [channelName, setChannelName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("/chathub")
      .withAutomaticReconnect()
      .build();

    newConnection.start().then(() => {
      console.log("Connected to SignalR hub");
      setConnection(newConnection);
    });

    return () => {
      newConnection.stop();
    };
  }, []);

  const handleSelectChannel = (id, name) => {
    if (connection) {
      connection.send("JoinChannel", id).catch((err) => console.error(err));
    }
    setChannelId(id);
    setChannelName(name);
  };

  const handleSendMessage = (channelId, username, content) => {
    if (connection) {
      connection
        .send("SendMessage", channelId, username, content)
        .catch((err) => console.error(err));
    }
  };

  const handleSetUsername = (event) => {
    event.preventDefault();
    setUsername(event.target.username.value);
  };

  return (
    <div className="flex h-screen bg-gray-200 overflow-y-hidden">
      <div className="w-1/4 border-r border-gray-300">
        <ChannelList
          onSelectChannel={(id, name) => handleSelectChannel(id, name)}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center bg-white border-b border-gray-300 p-4">
          <h1 className="text-xl font-bold pr-10">
            {channelName ? `#${channelName}` : "Welcome"}
          </h1>
          {username ? (
            <span className="text-gray-500">{username}</span>
          ) : (
            <form onSubmit={handleSetUsername}>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="rounded-lg border border-gray-400 px-2 py-1 text-sm mr-2"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
              >
                Set Username
              </button>
            </form>
          )}
        </div>
        {channelId && username && (
          <MessageList
            channelId={channelId}
            onSendMessage={handleSendMessage}
            username={username}
          />
        )}
      </div>
    </div>
  );
};

export default App;
