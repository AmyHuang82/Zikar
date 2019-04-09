import React from 'react';
import { connect } from 'react-redux';

class MakingCard extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='making_card'>
                <input placeholder='詞語' />
                <input placeholder='定義' />
                <img className='add_image' src='../../image/pic.svg' />
                <img src='../../image/trash.svg' />
            </div>
        )
    }
}

export default MakingCard;