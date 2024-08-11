import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ArrowUpIcon } from 'lucide-react';
// Components
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
// Add the doc to the DB collection
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { MessageType } from '../lib/types';

/**
 * Role:
 * - user: The user is the person who is interacting with the chatbot.
 * - assistant: The assistant is the chatbot.
 * - system: The system is the underlying chatbot platform, genarally one initial message defining how we want the chatbot to behave.
 */
const systemMessage = {
  role: 'system',
  content:
    'Speak like a friendly person and explain all concepts like you are having conversation with friends.',
};

interface FooterProps {
  isAIChatRoom: boolean;
  isAITyping: boolean;
  setIsAITyping: React.Dispatch<React.SetStateAction<boolean>>;
}

const Footer: React.FC<FooterProps> = ({ isAIChatRoom, setIsAITyping }) => {
  const [message, setMessage] = useState<string>('');
  const messagesHumanRef = collection(db, 'messages');
  const messagesAIRef = collection(db, 'aiMessages');
  const { uid, displayName, photoURL } = auth.currentUser || {};

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  /**
   * handleHumanChatSubmit function:
   * Simply add the message to the DB collection.
   */
  const handleHumanChatSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Do not submit if message is empty
    if (message.trim() === '') return;

    const newMessage: MessageType = {
      sender: {
        role: 'user',
        uid,
        displayName,
        photoURL,
      },
      text: message,
      createAt: serverTimestamp(),
    };

    await addDoc(messagesHumanRef, newMessage);

    setMessage('');
  };

  /**
   * handleAIChatSubmit function:
   * (1) Add the message to the DB collection.
   * (2) Process the message to get a response from the OpenAI API.
   * (3) Add the response to the DB collection.
   * (4) Set the AI typing indicator to false.
   */
  const handleAIChatSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Do not submit if message is empty
    if (message.trim() === '') return;

    const newMessage: MessageType = {
      sender: {
        role: 'user',
        uid,
        displayName,
        photoURL,
      },
      text: message,
      createAt: serverTimestamp(),
    };

    // Add the doc to the DB collection
    await addDoc(messagesAIRef, newMessage);

    // set a typing indicator for the AI
    setIsAITyping(true);

    // Process the message to get a response from the OpenAu API
    const response = await processMessageToChatGPT(newMessage.text);

    if (response && typeof response.choices[0].message.content === 'string') {
      const responseMessage: MessageType = {
        sender: {
          role: 'assistant',
          uid,
          displayName: 'ChatGPT',
          photoURL: '/chatgpt.png',
        },
        text: response.choices[0].message.content,
        createAt: serverTimestamp(),
      };
      await addDoc(messagesAIRef, responseMessage);
    } else {
      console.error('Response is not a string');
    }

    setMessage('');
    setIsAITyping(false);
  };

  const processMessageToChatGPT = async (msg: string): Promise<any> => {
    // apiMessage { role: "user" | "assistant", content: "Hello" }

    const messageToSend = { role: 'user', content: msg };

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, messageToSend],
    };

    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + import.meta.env.VITE_OPENAI_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      return response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="sticky bottom-0 bg-background px-4 py-3 shadow">
      <div className="w-full relative">
        <form
          onSubmit={isAIChatRoom ? handleAIChatSubmit : handleHumanChatSubmit}
        >
          <Textarea
            onChange={handleChange}
            value={message}
            placeholder="Type your message..."
            className="min-h-[48px] w-full rounded-2xl border border-neutral-500 bg-muted p-4 pr-16 shadow-sm font-sans"
          />
          <Button type="submit" className="absolute right-3 top-3">
            <ArrowUpIcon size={16} />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Footer;
