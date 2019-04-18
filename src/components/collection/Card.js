import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: this.props.word,
            open: ''
        }
        this.flipCard = this.flipCard.bind(this);
    }

    flipCard() {
        if (this.state.showing === this.props.word) {
            this.setState({ showing: this.props.definition });
        } else {
            this.setState({ showing: this.props.word });
        }
        this.setState({ open: 'open' });
        setTimeout(() => {
            this.setState({ open: '' });
        }, 500);
    }

    componentDidUpdate(prevProps) {
        if (this.props.word !== prevProps.word) {
            this.setState({ showing: this.props.word });
        }
    }

    render() {
        let color;
        if (this.props.familiarity === 0) {
            color = 'silver';
        } else if (this.props.familiarity < 60) {
            color = 'red';
        } else {
            color = 'green';
        }

        return (
            <div className={`show_card ${this.state.open} ${this.props.nextAnimation}`} onClick={this.flipCard} >
                <KeyboardEventHandler handleKeys={['up']} onKeyEvent={this.flipCard} />
                <p className='text-align-center'>{this.state.showing}</p>
                <div className='paging'>{this.props.currentIndex + 1}/{this.props.length}</div>
                <div className='show_card_hover' style={{ color: color }}>熟悉程度：{this.props.familiarity}%</div>
            </div>
        )
    }
}

export default Card;