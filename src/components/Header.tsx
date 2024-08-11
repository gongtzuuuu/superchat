import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import SignOut from './SignOut';
// Utils
import { auth } from '../config/firebase';
import { Button } from './ui/button';

interface HeaderProps {
  isAIChatRoom: boolean;
  setIsAIChatRoom: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ isAIChatRoom, setIsAIChatRoom }) => {
  const { displayName, photoURL } = auth.currentUser || {};
  const usernameInitial = displayName?.charAt(0).toUpperCase() ?? '';
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-[#0F172A] px-4 py-3 shadow">
      <div className="flex items-center gap-2">
        <div className="w-15 h-15">
          <img src="/favicon.png" className="w-10 h-10" />
        </div>
        <Button onClick={() => setIsAIChatRoom((prev) => !prev)}>
          Talk To {isAIChatRoom ? 'Human' : 'AI'}
        </Button>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={photoURL ?? ''} />
            <AvatarFallback>{usernameInitial}</AvatarFallback>
          </Avatar>
          <div className="text-sm font-medium text-white">{displayName}</div>
        </div>
        <SignOut />
      </div>
    </header>
  );
};

export default Header;
