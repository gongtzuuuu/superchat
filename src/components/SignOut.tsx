import { LogOut } from 'lucide-react';
import { auth } from '../config/firebase';
import { Button } from './ui/button';

const SignOut = () => {
  const signOutWithGoogle = () => {
    auth.signOut();
  };

  return (
    <Button onClick={signOutWithGoogle}>
      <LogOut size={16} />
    </Button>
  );
};

export default SignOut;
