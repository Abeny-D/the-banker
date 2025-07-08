import MainPage from "./components/mainpage.tsx";
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import JoinCreateRoom from "./components/join_createRoom.jsx";
import GameFlow from "./components/gameFlow.tsx";
import DeckContainer from "./components/deckContainer.js";
import PlayersNames from "./components/PlayersList.tsx";
import NextTurn from "./components/test.js";

function App() {



  return ( <div>
{/*<NextTurn />*/}
      {/*<PlayersNames />*/}
{/*<DeckContainer />*/}
      <Router>

          <Routes>
              <Route path="/" element={<MainPage/>}/>
              <Route path="/join_createRoom" element={<JoinCreateRoom/>}/>
              <Route path="/gameFlow" element={<GameFlow/>}/>
              <Route path="/playersName" element={<PlayersNames/>}/>
          </Routes>
      </Router>


  </div> )
}

export default App
