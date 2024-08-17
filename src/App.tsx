import { useAuthState } from 'react-firebase-hooks/auth';
import ChatRoom from './components/ChatRoom';
import Landing from './components/Landing';
import { auth } from './config/firebase';
import './styles/globals.css';

const App = () => {
  const [user] = useAuthState(auth);
  return (
    <main className="w-screen flex justify-center items-center bg-slate-200">
      <section className="flex h-screen w-[600px] flex-col bg-slate-400 justify-center">
        {user ? <ChatRoom /> : <Landing />}
      </section>
    </main>
  );
};

export default App;
