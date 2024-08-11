import { useState } from 'react';
import { auth } from '../config/firebase';
import Header from './Header';
import Footer from './Footer';
import ChatRoomHuman from './ChatRoomHuman';
import ChatRoomAI from './ChatRoomAI';

const ChatRoom = () => {
  const currentUserId = auth.currentUser?.uid ?? '';
  const [isAIChatRoom, setIsAIChatRoom] = useState<boolean>(false);
  const [isAITyping, setIsAITyping] = useState<boolean>(false);

  return (
    <>
      <Header isAIChatRoom={isAIChatRoom} setIsAIChatRoom={setIsAIChatRoom} />
      {isAIChatRoom ? (
        <ChatRoomAI currentUserId={currentUserId} isAITyping={isAITyping} />
      ) : (
        <ChatRoomHuman currentUserId={currentUserId} />
      )}
      {/** Footer */}
      <Footer
        isAIChatRoom={isAIChatRoom}
        isAITyping={isAITyping}
        setIsAITyping={setIsAITyping}
      />
    </>
  );
};

export default ChatRoom;
