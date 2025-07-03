import {useState} from "react";


export default function PlayersNames() {

    const [player, setPlayer] = useState("")
    const [playerBet, setPlayerBet] = useState("")
    const [playerBetList, setPlayerBetList] = useState([])
    const [playersNames, setPlayersList] = useState([])

     function addPlayer_bet() {
        if (player.trim() === "" || playerBet.trim() === "") return;
        if(playerBetList.length === 4) {
            alert("You can only add 4 players");
            return;
        }
        setPlayersList((prev) => [...prev, player] );
            setPlayer("");
        setPlayerBetList((prev) => [...prev, playerBet] );
            setPlayerBet("");

}



    return (
        <div>
            <input type="text" onChange={(e) => setPlayer(e.target.value)} value={player}></input>
            <input type="number" onChange={(e) => setPlayerBet(e.target.value)} value={playerBet}></input>
            <button onClick={addPlayer_bet}>Submit</button>
            {playersNames.map((player, index) =>
                <div key={index}>
                    <h3>👤 Player Name: {player}</h3>
                </div>
            ) }
            <div>
                {playerBetList.map((bet, index) =>
                    <div key={index}>
                        <h3>💸 Bet Amount: {bet}</h3>
                    </div>
                )}
            </div>
        </div>

    )
}

