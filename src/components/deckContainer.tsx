import '../cssDirectory/DeckContainer.css';
import * as React from "react";

// @ts-ignore
import CardBack from '../assets/cardBack.jpg'


type cardInput = {
    hand?: string;
}
function DeckContainer(props: cardInput) {

    const number = props.hand.slice(0, -1);
    const suit = props.hand.slice(-1);
    const isFacedown = !props.hand;


    if (isFacedown) {

        return (
            <div className="DeckContainer">
                <img src={CardBack}  alt="Card Back" className="backImg"/>
            </div>
        )
    }



    return (
        <>
            <div className="DeckContainer">
                <p className="cardTop">{number}</p>
                <p className="cardMiddel">{suit}</p>
                <p className="cardBottom">{number}</p>
            </div>
        </>
    )
}

export default DeckContainer
