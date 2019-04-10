import React from 'react';
import { connect } from 'react-redux';

class MakingCard extends React.Component {
    constructor(props) {
        super(props);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.wordInputHandler = this.wordInputHandler.bind(this);
        this.defInputHandler = this.defInputHandler.bind(this);
    }

    wordInputHandler(e) {
        this.props.wordChange(this.props, e.target.value);
    }

    defInputHandler(e) {
        this.props.definitionChange(this.props, e.target.value);
    }

    deleteHandler(e) {
        this.props.deleteCard(this.props);
    }

    render() {
        return (
            <div className='making_card'>
                <input placeholder='詞語' onChange={this.wordInputHandler} value={this.props.word} style={{ borderBottom: this.props.empty }} />
                <input placeholder='定義' onChange={this.defInputHandler} value={this.props.definition} style={{ borderBottom: this.props.empty }} />
                <img className='add_image' src='../../image/pic.svg' />
                <img onClick={this.deleteHandler} className='delet_card' src='../../image/trash.svg' />
            </div>
        )
    }
}

export default MakingCard;