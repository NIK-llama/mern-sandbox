import { useEffect, useState, useRef } from "react";

type Messages = {
  text: string;
  isMine: boolean;
};

function App() {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [input, setInput] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const ws = useRef<WebSocket | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, { text: event.data, isMine: false }]);
      scrollToBottom();
    };

    ws.current.onclose = () => {
      console.log("🔌 disconnected from server");
    };

    return () => ws.current?.close();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const showCustomError = (message: string) => {
    console.error(`ERROR: ${message}`);
  };


  const joinRoom = () => {
    if (!roomId.trim()) return showCustomError("Enter a room ID!");
    
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

    setMessages((prev) => [...prev, { text: input, isMine: true }]);
    setInput("");

  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-inter">
      <div className="p-4 bg-gray-800 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">
            {joined ? `Room: ${roomId}` : "Simple Chat"}
        </h1>
        {joined && (
          <span className="text-sm text-purple-400">Connected</span>
        )}
      </div>

      {!joined ? (
        <div className="flex flex-col justify-center items-center flex-1 gap-6 p-8">
          <h1 className="text-4xl font-extrabold text-purple-400">Join a Chat Room</h1>
          <p className="text-gray-400">Enter a unique ID to start or join a conversation.</p>
          <input
            type="text"
            placeholder="Enter Room ID (e.g., 'red')"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full max-w-sm bg-gray-700 text-white p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500 placeholder-gray-400 transition-all border border-transparent hover:border-purple-600"
          />
          <button
            onClick={joinRoom}
            className="w-full max-w-sm bg-purple-600 hover:bg-purple-700 active:scale-[0.98] transition-all text-white px-6 py-4 rounded-xl font-semibold shadow-lg shadow-purple-900/50"
          >
            Join Room
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[75%] p-4 rounded-2xl shadow-lg transition-all text-sm wrap-break-word ${
                  msg.isMine
                    ? "bg-blue-600 self-end rounded-br-none"
                    : "bg-gray-700 self-start rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="w-full bg-gray-800 border-t border-gray-700 p-4 flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-gray-700 text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white px-5 py-4 rounded-xl font-medium shadow-md disabled:bg-gray-600 disabled:opacity-50"
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