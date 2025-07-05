import {useState} from "react";
import "../cssDirectory/gameFlow.css";
import getCardValue from "./getCardValue";
import {createDeck, shuffleDeck} from "./shuffleCreateCard";
import DeckContainer from "./deckContainer";
import {motion} from 'framer-motion';


function GameFlow() {
    const [players, setPlayers] = useState([]);
    const [randomCard, setRandomCard] = useState(null);
    const [wonLossStatus, setWonLossStatus] = useState("Waiting for status");
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [bankAmount, setBankAmount] = useState(1000);
    const [currentBet, setCurrentBet] = useState(50);
    const [roundTurn, setRoundTurn] = useState(0);
    const [randomCardAnimation, setRandomCardAnimation] = useState(false);


    function createPlayers(players: string[]) {
        const deck = shuffleDeck(createDeck());
        const newPlayers = [];

        for (let i = 0; i < 4; i++) {
            const name = players[i];
            const hand = [deck.pop(), deck.pop()];
            const coins = 500;
            newPlayers.push({id: i, name, hand, bet: coins});
        }

        // return newPlayers;

        setPlayers(newPlayers);

    }

    function handleStartGame() {

        const playerNameInput: string[] = [];

        while (playerNameInput.length < 4) {
            const newPlayerName = prompt(`Please enter player ${playerNameInput.length + 1}`)

            if (newPlayerName === null) {
                break;
            }

            if (!newPlayerName?.trim()) {
                continue;
            }

            playerNameInput.push(newPlayerName);
        }

        if (playerNameInput.length < 4) {
            return;
        }

        createPlayers(playerNameInput);
        setCurrentPlayerIndex(0);
        setWonLossStatus("Game started!");
        setRandomCard(null);
        setBankAmount(1000);
        setCurrentBet(50);
        setRoundTurn(0);
    }

    function shufflePlayersCards() {
        if (players.length === 0) return;
        const deck = shuffleDeck(createDeck());
        const updatedPlayers = players.map((player) => ({
            ...player,
            hand: [deck.pop(), deck.pop()],
        }));
        // setPlayers(updatedPlayers);
        setRandomCard((prev) => prev || null);
        setWonLossStatus("All players received new cards!");
    }

    function nextTurn() {
        const nextIndex = (currentPlayerIndex + 1) % players.length;
        const newRoundTurn = roundTurn + 1;

        setCurrentPlayerIndex(nextIndex);
        setRoundTurn(newRoundTurn);

        if (newRoundTurn % players.length === 0) {
            // A full round completed
            shufflePlayersCards();
        }
    }

    function bet2() {
        if (players.length === 0 || currentBet <= 0) return;

        const updatedPlayers = [...players];
        const currentPlayer = updatedPlayers[currentPlayerIndex];

        if (currentBet > currentPlayer.bet) {
            setWonLossStatus(`${currentPlayer.name} tried to bet more than they have.`);
            return;
        }

        if (currentBet > bankAmount) {
            setWonLossStatus(`Bank doesn't have enough coins. Max allowed: ${bankAmount}`);
            return;
        }

        const deck = shuffleDeck(createDeck());
        const card = deck.pop();
        setRandomCard(card);

        const [card1, card2] = currentPlayer.hand;
        const val1 = getCardValue(card1);
        const val2 = getCardValue(card2);
        const valRand = getCardValue(card);

        const isBetween =
            (valRand > val1 && valRand < val2) || (valRand < val1 && valRand > val2);

        if (isBetween) {
            currentPlayer.bet += currentBet;
            setBankAmount((prev) => prev - currentBet);
            setWonLossStatus(`${currentPlayer.name} WON! +${currentBet} coins.`);

            setRandomCardAnimation(!randomCardAnimation);
            setTimeout(() => {
                setRandomCardAnimation(false);
            }, 2000);

        } else {
            currentPlayer.bet -= currentBet;
            setBankAmount((prev) => prev + currentBet);
            setWonLossStatus(`${currentPlayer.name} LOST! -${currentBet} coins.`);

            setRandomCardAnimation(!randomCardAnimation);
            setTimeout(() => {
                setRandomCardAnimation(false);
            }, 2000);
        }

        setTimeout(() => {
            nextTurn();
            setPlayers(updatedPlayers);
        }, 2000);


        setCurrentBet(currentBet);
    }

    function bet() {
        if (players.length === 0 || currentBet <= 0) return;

        const updatedPlayers = [...players];
        const currentPlayer = updatedPlayers[currentPlayerIndex];

        const playersBets : { idx: number, betAmount: number, hand: [string, string] }[] = [];

        playersBets.push({
            idx: currentPlayerIndex,
            betAmount: currentBet,
            hand: currentPlayer.hand,
        })

        let tempBankAmount = bankAmount - currentBet;
        let nxtPlayerIndex = currentPlayerIndex + 1;

        while (nxtPlayerIndex < players.length && tempBankAmount > 0) {
            const nextPlayerBet = prompt(`Enter your bet amount Player ${nxtPlayerIndex + 1} (${players[nxtPlayerIndex]?.name})`);

            let newInput :number = Number(nextPlayerBet)

            if (isNaN(newInput)) {
                 alert("please enter a number only")

                 continue;
             }


            if (nextPlayerBet === null) {
                nxtPlayerIndex += 1;

                continue;
            }

            const currentPlayer = players[nxtPlayerIndex];

            console.log('curret player --- :', currentPlayer);

            if (parseInt(nextPlayerBet) > currentPlayer.bet) {
                setWonLossStatus(`${currentPlayer.name} tried to bet more than they have.`);

                continue;
            }

            if (parseInt(nextPlayerBet) > tempBankAmount) {
                setWonLossStatus(`Bank doesn't have enough coins. Max allowed: ${tempBankAmount}`);

                continue;
            }

            const betAmount = parseInt(nextPlayerBet);

            playersBets.push({
                idx: nxtPlayerIndex,
                betAmount: betAmount,
                hand: currentPlayer.hand,
            })

            nxtPlayerIndex += 1;
            tempBankAmount -= 0;
        }

        console.log('playersBets --- : ', playersBets)


        const deck = shuffleDeck(createDeck());
        const card = deck.pop();
        setRandomCard(card);

        const [card1, card2] = currentPlayer.hand;
        const val1 = getCardValue(card1);
        const val2 = getCardValue(card2);
        const valRand = getCardValue(card);

        const isBetween =
            (valRand > val1 && valRand < val2) || (valRand < val1 && valRand > val2);


        let tempBank2 = bankAmount;
        let tempPlayers = [...players];
        playersBets.forEach((bets) => {

            console.log('bets : ', bets)

            if (isBetween) {
                // currentPlayer.bet += currentBet;
                // setBankAmount((prev) => prev - currentBet);

                tempPlayers = tempPlayers.map(prev => {
                    if(prev.id === bets.idx) {
                        return {
                            ...prev, bet: prev.bet + bets.betAmount
                        }
                    }
                    return prev;
                })

                tempBank2 -= bets.betAmount;

                // setWonLossStatus(`${currentPlayer.name} WON! +${currentBet} coins.`);


            } else {

                tempPlayers = tempPlayers.map(prev => {
                    if(prev.id === bets.idx) {
                        console.log('prev : ', prev)

                        return {
                            ...prev,
                            bet: prev.bet - bets.betAmount
                        }
                    }
                    return prev;
                })

                tempBank2 += bets.betAmount;
                // setWonLossStatus(`${currentPlayer.name} LOST! -${currentBet} coins.`);

            }

        })

        console.log('temp player ; ',  tempPlayers, tempBank2)
        setBankAmount(tempBank2);
        setPlayers(tempPlayers)


        setRandomCardAnimation(!randomCardAnimation);
        setTimeout(() => {
            setRandomCardAnimation(false);
        }, 2000);


        setTimeout(() => {
            nextTurn();
            // setPlayers(updatedPlayers);
        }, 2000);


        setCurrentBet(currentBet);
    }

    function passTurn() {
        if (players.length === 0) return;
        setWonLossStatus(`${players[currentPlayerIndex].name} passed their turn.`);
        nextTurn();
        setRandomCard(null);
    }

    return (
        <div className="gameFlow">
            <h2 className="gameHeader">The Banker 💰</h2>
            <div className="startShuffleBank">
                <button onClick={handleStartGame}>Start New Game</button>
                <button onClick={shufflePlayersCards} disabled={players.length === 0}>
                    Shuffle Cards
                </button>
                <h3>Bank: {bankAmount} 💰</h3>
            </div>

            <div className="randomStatus" style={{display: players.length === 0 ? "none" : "flex"}}>
                <h3>Random Card: <motion.div drag animate={{
                    y: randomCardAnimation ? 120 : 0,
                    x: randomCardAnimation ? 400 : 0,
                    rotate: randomCardAnimation ? 360 : 0,
                    scale: randomCardAnimation ? 3.5 : 1
                }}>

                    <DeckContainer hand={randomCard || ""}/>

                </motion.div></h3>

                <h3>Status: {wonLossStatus}</h3>
            </div>

            {
                players.length === 0 ? (
                    <div>
                        <h1>
                            please start the game
                        </h1>
                    </div>
                ) : (
                    <div className="bottomHalfItems">
                        {players.map((player, index) => (
                            <div
                                key={index}
                                id="playerDetails"
                                className={index === currentPlayerIndex ? "activePlayer" : ""}
                            >
                                <h3>👤 {player.name}</h3>
                                <p className={index === currentPlayerIndex ? "" : "MakeTheCardBlurry"}>Card
                                    One: <DeckContainer hand={player.hand[0]}></DeckContainer></p>
                                <p className={index === currentPlayerIndex ? "" : "MakeTheCardBlurry"}>Card
                                    Two: <DeckContainer hand={player.hand[1]}></DeckContainer></p>
                                <p> Coins:💸 {player.bet}</p>
                            </div>
                        ))}

                        <div className="amountBet">
                            <label>
                                Enter Bet Amount:
                                <input
                                    type="number"
                                    min="1"
                                    max={Math.min(players[currentPlayerIndex]?.bet || 1, bankAmount)}
                                    value={currentBet}
                                    onChange={(e) => setCurrentBet(Number(e.target.value))}
                                    disabled={players.length === 0}
                                />
                            </label>
                            <button onClick={bet2} disabled={players.length === 0 || currentBet <= 0}>
                                Bet
                            </button>
                        </div>

                        <div className="turnPass">
                            <h3>🎯 Turn: {players[currentPlayerIndex]?.name || "None"}</h3>
                            <button onClick={passTurn} disabled={players.length === 0}>
                                Pass
                            </button>
                        </div>
                    </div>
                )
            }
        </div>

    );
}

export default GameFlow;
