

 function getCardValue(card) {
    const faceCardMap = { A: 1, J: 11, Q: 12, K: 13 };
    const value = card.match(/\d+|[JQKA]/)[0];
    return faceCardMap[value] || parseInt(value);
}


 export default getCardValue;