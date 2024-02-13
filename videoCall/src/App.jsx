import { Routes, Route } from "react-router-dom";
import Lobby from './Pages/Loby';
import Room from './Pages/Room'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;