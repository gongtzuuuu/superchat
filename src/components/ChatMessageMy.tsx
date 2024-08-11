import { DocumentData } from 'firebase/firestore';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

const ChatMessageMy = ({ message }: { message: DocumentData }) => {
  const usernameInitial = message.sender.displayName.charAt(0).toUpperCase();
  return (
    <div className="flex items-start gap-4 justify-end">
      <div className="flex flex-col items-end space-y-1">
        <div className="text-sm">{message.sender.displayName}</div>
        <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
          {message.text}
        </div>
      </div>
      <Avatar className="h-8 w-8">
        <AvatarImage src={message.sender.photoURL} />
        <AvatarFallback>{usernameInitial}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ChatMessageMy;
