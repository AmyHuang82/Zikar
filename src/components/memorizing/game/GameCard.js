import React from 'react';

function GameCard(props) {
    return (
        <div className={`game_card ${props.border}`} onClick={props.pickCard.bind(this, props)}>
            <div className='show_word'>{props.show}</div>
        </div>
    )
}

export default GameCard;