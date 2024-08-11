import { FieldValue } from 'firebase/firestore';

export interface MessageType {
  sender: {
    role: 'user' | 'assistant';
    uid: string | null | undefined;
    displayName: string | null | undefined;
    photoURL: string | null | undefined;
  };
  text: string;
  createAt: FieldValue;
}

export interface AIMessageType extends MessageType {
  associateUserId: string | null | undefined;
}
