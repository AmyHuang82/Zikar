import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: this.props.word,
            open: ''
        }
        this.flipCard = this.flipCard.bind(this);
    }

    flipCard(e) {
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

    componentWillReceiveProps(nextProps) {
        this.setState({ showing: nextProps.word });
    }

    render() {
        return (
            <div className={`show_card ${this.state.open} ${this.props.nextAnimation}`} onClick={this.flipCard} >
                <p className='text-align-center'>{this.state.showing}</p>
                <div className='paging'>{this.props.currentIndex + 1}/{this.props.length}</div>
                <div className='show_card_hover'>熟悉程度：0% (透過考試增加熟悉程度)</div>
            </div>
        )
    }
}

export default Card;