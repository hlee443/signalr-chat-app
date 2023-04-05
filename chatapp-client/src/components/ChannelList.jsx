import React, { useState, useEffect } from "react";
import axios from "axios";

const ChannelList = ({ onSelectChannel }) => {
  const [channels, setChannels] = useState([]);
  const [newChannelName, setNewChannelName] = useState("");
  const [editChannelId, setEditChannelId] = useState(null);
  const [editChannelName, setEditChannelName] = useState("");

  useEffect(() => {
    async function fetchChannels() {
      const response = await axios.get("/api/channels");
      setChannels(response.data);
    }

    fetchChannels();
  }, []);

  const handleAddChannel = async () => {
    await axios.post("/api/channels", { name: newChannelName });
    setNewChannelName("");
    const response = await axios.get("/api/channels");
    setChannels(response.data);
  };

  const handleEditChannel = async (id) => {
    await axios.put(`/api/channels/${id}`, { id, name: editChannelName });
    setEditChannelId(null);
    setEditChannelName("");
    const response = await axios.get("/api/channels");
    setChannels(response.data);
  };

  const handleDeleteChannel = async (id) => {
    await axios.delete(`/api/channels/${id}`);
    const response = await axios.get("/api/channels");
    setChannels(response.data);
  };

  return (
    <div className="flex flex-col w-64 h-screen bg-gray-800">
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-900">
        <h1 className="text-xl font-bold text-white">Channel List</h1>
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="New channel name"
          className="w-full px-2 py-1 mb-2 text-gray-900 placeholder-gray-500 bg-gray-300 border border-gray-400 rounded"
          value={newChannelName}
          onChange={(e) => setNewChannelName(e.target.value)}
        />
        <button
          className="block w-full px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={handleAddChannel}
        >
          Add Channel
        </button>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {channels.map((channel) => (
          <li
            key={channel.id}
            onClick={() => onSelectChannel(channel.id)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white cursor-pointer hover:bg-gray-700"
          >
            <span>{channel.name}</span>
            {editChannelId === channel.id ? (
              <>
                <input
                  type="text"
                  value={editChannelName}
                  onChange={(e) => setEditChannelName(e.target.value)}
                  className="flex-1 ml-2 px-2 py-1 text-gray-900 placeholder-gray-500 bg-gray-300 border border-gray-400 rounded"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditChannel(channel.id, editChannelName);
                    setEditChannelId(null);
                  }}
                  className="px-4 py-2 ml-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditChannelId(channel.id);
                  setEditChannelName(channel.name);
                }}
                className="px-4 py-2 ml-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteChannel(channel.id);
              }}
              className="px-4 py-2 ml-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
);

};

export default ChannelList;
