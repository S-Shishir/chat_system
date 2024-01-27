import './App.css';
import { io } from 'socket.io-client';
import Chat from './components/Chat';

const socket = io.connect("http://localhost:8299");

function App() {
  return (
    <div className="App">
      <Chat socket={socket}/>
    </div>
  );
}

export default App;
