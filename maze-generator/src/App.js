import './App.css';
import Maze from './components/Maze';

function App() {
  return (
    <div className="App">
      <h1>Random Maze Generator</h1>
      <Maze size={24}/>
    </div>
  );
}

export default App;


//Maze size can be changed by changing the value of size property of Maze component