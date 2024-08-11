import Cookies from 'universal-cookie';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../config/firebase';
import { Button } from './ui/button';

const cookies = new Cookies();

const SignIn = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // const result = await signInWithRedirect(auth, provider);
      // console.log(result);
      cookies.set('auth-token', result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <Button className="w-fit" onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
    </div>
  );
};

export default SignIn;
