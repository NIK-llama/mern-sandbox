import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // connect when component mounts
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.current.onclose = () => {
      console.log("🔌 disconnected from server");
    };

    return () => ws.current?.close();
  }, []);

  const joinRoom = () => {
    if (!roomId.trim()) return alert("Enter a room ID!");
    ws.current?.send(
      JSON.stringify({
        type: "join",
        payload: { roomId },
      })
    );
    setJoined(true);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    ws.current?.send(
      JSON.stringify({
        type: "chat",
        payload: { message: input },
      })
    );
    setMessages((prev) => [...prev, input]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-linear-to-b from-gray-900 via-black to-gray-800 text-white">
      {!joined ? (
        <div className="flex flex-col justify-center items-center flex-1 gap-4">
          <h1 className="text-3xl font-semibold">Join a Chat Room</h1>
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="bg-gray-800 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
          />
          <button
            onClick={joinRoom}
            className="bg-purple-600 hover:bg-purple-700 transition-all text-white px-5 py-3 rounded-xl font-medium shadow"
          >
            Join Room
          </button>
        </div>
      ) : (
        <>
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className="max-w-[75%] bg-purple-600 p-3 rounded-2xl shadow self-start"
              >
                {msg}
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="w-full bg-gray-900 border-t border-gray-700 p-3 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-gray-800 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
            />
            <button
              onClick={sendMessage}
              className="bg-purple-600 hover:bg-purple-700 active:scale-95 transition-all text-white px-5 py-3 rounded-xl font-medium shadow"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
