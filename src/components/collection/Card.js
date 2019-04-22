import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: this.props.word,
            open: '',
            pic_showing: false
        }
        this.flipCard = this.flipCard.bind(this);
    }

    flipCard() {
        if (this.state.showing === this.props.word) {
            this.setState({ showing: this.props.definition });
            if (this.props.picture !== '') {
                this.setState({ pic_showing: true });
            }
        } else {
            this.setState({ showing: this.props.word, pic_showing: false });
        }
        this.setState({ open: 'open' });
        setTimeout(() => {
            this.setState({ open: '' });
        }, 500);
    }

    componentDidUpdate(prevProps) {
        if (this.props.word !== prevProps.word) {
            this.setState({ showing: this.props.word, pic_showing: '' });
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
                <div style={{ display: this.state.pic_showing ? 'block' : 'none' }} className='img_wrap'>
                    <img src={this.props.picture} />
                </div>
                <p className='text-align-center'>{this.state.showing}</p>
                <div className='paging'>{this.props.currentIndex + 1}/{this.props.length}</div>
                <div className='show_card_hover' style={{ color: color }}><span>熟悉程度：</span>{this.props.familiarity}%</div>
            </div>
        )
    }
}

export default Card;