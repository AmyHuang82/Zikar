import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

class MatchGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardsArray: '',
            count: 0
        }
        this.gameStart = this.gameStart.bind(this);
        this.pickCard = this.pickCard.bind(this);
    }

    gameStart(collectionContent) {
        let passArray = [];
        if (collectionContent !== null) {
            let randomArray = [];
            // 判斷如果字少於4個就每個字再複製一份
            if (collectionContent.length < 4) {
                for (let i = 0; i < collectionContent.length; i++) {
                    for (let j = 0; j < 2; j++) {
                        randomArray.push(collectionContent[i]);
                    }
                }
            } else {
                randomArray = collectionContent;
            }
            // 打亂陣列
            let temporaryValue, randomIndex;
            for (let i = 0; i < randomArray.length; i++) {
                randomIndex = Math.floor(Math.random() * randomArray.length);
                temporaryValue = randomArray[i];
                randomArray[i] = randomArray[randomIndex];
                randomArray[randomIndex] = temporaryValue;
            }
            // 只取前4個數
            randomArray.splice(4, randomArray.length - 4);
            // 複製一份一樣的
            for (let i = 0; i < randomArray.length; i++) {
                for (let j = 0; j < 2; j++) {
                    passArray.push(randomArray[i]);
                }
            }
            // 全部多存一個show的key並且4個是word、4個是definition
            for (let i = 0; i < 8; i++) {
                if (i % 2 === 0) {
                    passArray[i] = { ...passArray[i], show: passArray[i].word };
                } else {
                    passArray[i] = { ...passArray[i], show: passArray[i].definition };
                }
            }
            // 再次打亂順序
            for (let i = 0; i < passArray.length; i++) {
                randomIndex = Math.floor(Math.random() * passArray.length);
                temporaryValue = passArray[i];
                passArray[i] = passArray[randomIndex];
                passArray[randomIndex] = temporaryValue;
            }
            // 將新的順序資料存入資料裡
            for (let i = 0; i < 8; i++) {
                passArray[i] = { ...passArray[i], label: i };
            }
        }
        this.setState({ cardsArray: passArray });
    }

    pickCard(card, e) {
        let cardsArray = this.state.cardsArray.slice();
        let count = this.state.count;

        if (cardsArray[card.label].border === undefined) {
            if (this.state.count < 2) {
                cardsArray[card.label] = { ...cardsArray[card.label], border: 'active' };
                this.setState({ cardsArray: cardsArray });
                this.setState((prevState) => ({ count: prevState.count + 1 }));
                count++;
            }
        }

        if (count === 2) {
            let checkArray = cardsArray.filter(item => item.border !== undefined);
            if (checkArray[0].word === checkArray[1].word) {
                cardsArray[checkArray[0].label].border = 'correct';
                cardsArray[checkArray[1].label].border = 'correct';
            } else {
                cardsArray[checkArray[0].label].border = 'wrong';
                cardsArray[checkArray[1].label].border = 'wrong';
            }
        }
    }

    componentWillMount() {
        if (this.props.collectionContent !== null) {
            this.gameStart(this.props.collectionContent);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.gameStart(nextProps.collectionContent);
    }

    render() {
        return (
            <div className='content game_area'>
                <Link className='back_to_collection' to={'/Collection/' + this.props.match.params.id}></Link>
                {
                    this.state.cardsArray && this.state.cardsArray.map((card, index) => {
                        return <GameCard
                            key={index}
                            label={card.label}
                            show={card.show}
                            word={card.word}
                            pickCard={this.pickCard}
                            border={card.border}
                        />
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const collections = state.firestore.data.collection;
    const collectionContent = collections ? collections[id].content : null;

    return {
        collectionContent: collectionContent
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'collection' }
    ])
)(MatchGame);


function GameCard(props) {
    return (
        <div className='game_card' onClick={props.pickCard.bind(this, props)}>
            <div className={`show_word ${props.border}`}>{props.show}</div>
        </div>
    )
}