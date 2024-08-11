import React, { useEffect, useState } from 'react';
import {
  collection,
  DocumentData,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import ChatMessage from './ChatMessage';
import ChatMessageMy from './ChatMessageMy';
import { db } from '../config/firebase';

interface ChatRoomHumanProps {
  currentUserId: string;
}

const ChatRoomHuman: React.FC<ChatRoomHumanProps> = ({ currentUserId }) => {
  const messagesRef = collection(db, 'messages');
  const queryMessages = query(messagesRef, orderBy('createAt'), limit(25));
  const [messages, setMessages] = useState<DocumentData[]>([]);

  useEffect(() => {
    // Add Query Snapshot Listener
    onSnapshot(queryMessages, (snapshot) => {
      const messageArray: DocumentData[] = [];
      snapshot.forEach((doc) => {
        messageArray.push(doc.data());
      });
      setMessages(messageArray);
    });

    // setMessages(messages);
  }, []);

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="grid gap-4">
        {messages &&
          messages.length > 0 &&
          messages.map((message: DocumentData, index) =>
            message.sender.uid === currentUserId ? (
              <ChatMessageMy key={index} message={message} />
            ) : (
              <ChatMessage key={index} message={message} />
            )
          )}
      </div>
    </div>
  );
};

export default ChatRoomHuman;
