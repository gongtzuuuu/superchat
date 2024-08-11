import { useAuthState } from 'react-firebase-hooks/auth';
import ChatRoom from './components/ChatRoom';
import SignIn from './components/SignIn';
import { auth } from './config/firebase';
import './styles/globals.css';

const App = () => {
  const [user] = useAuthState(auth);
  return (
    <main className="w-screen flex justify-center items-center bg-slate-200">
      <section className="flex h-screen w-[600px] flex-col bg-slate-400 justify-center">
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </main>
  );
};

export default App;
