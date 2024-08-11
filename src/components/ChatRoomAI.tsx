import React, { useEffect, useState } from 'react';
import {
  collection,
  DocumentData,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import ChatMessage from './ChatMessage';
import ChatMessageMy from './ChatMessageMy';
import { db } from '../config/firebase';
import TypingIndicator from './TypingIndicator';

const greetingmessage = {
  sender: {
    role: 'ai',
    uid: 'chatgpt',
    displayName: 'ChatGPT',
    photoURL: '/chatgpt.png',
  },
  text: 'Hello! How can I help you today?',
  createdAt: new Date(),
} as DocumentData;

interface ChatRoomAIProps {
  currentUserId: string;
  isAITyping: boolean;
}

const ChatRoomAI: React.FC<ChatRoomAIProps> = ({
  currentUserId,
  isAITyping,
}) => {
  const messagesRef = collection(db, 'aiMessages');
  const queryMessages = query(
    messagesRef,
    orderBy('createAt'),
    where('sender.uid', '==', currentUserId),
    limit(25)
  );
  const [messages, setMessages] = useState<DocumentData[]>([]);

  useEffect(() => {
    // Add Query Snapshot Listener
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const messageArray: DocumentData[] = [];
      snapshot.forEach((doc) => {
        messageArray.push(doc.data());
      });
      setMessages(messageArray);
    });

    setMessages(messages);
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="grid gap-4">
        <ChatMessage message={greetingmessage} />
        {messages &&
          messages.length > 0 &&
          messages.map((message: DocumentData, index) =>
            message.sender.role === 'user' ? (
              <ChatMessageMy key={index} message={message} />
            ) : (
              <ChatMessage key={index} message={message} />
            )
          )}
      </div>
      {isAITyping && <TypingIndicator />}
    </div>
  );
};

export default ChatRoomAI;
