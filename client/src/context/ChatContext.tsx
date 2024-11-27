import React, { createContext, useContext, useState } from "react";

interface ChatContextType {
  username: string | null;
  currentRoom: string | null;
  setUsername: (username: string) => void;
  setCurrentRoom: (room: string | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState<string | null>(null);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  return (
    <ChatContext.Provider
      value={{ username, setUsername, currentRoom, setCurrentRoom }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
