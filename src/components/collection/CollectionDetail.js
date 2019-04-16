import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Card from './Card';
import { deleteCollection } from '../../store/actions/collectionActions';

class CollectionDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collection: this.props.collection,
            currentIndex: 0,
            nextAnimation: '',
            deleteState: false,
            deleteCheck: false
        }
        this.changeCard = this.changeCard.bind(this);
        this.shuffleCards = this.shuffleCards.bind(this);
        this.exchangeWordDef = this.exchangeWordDef.bind(this);
        this.deleteCheckHandler = this.deleteCheckHandler.bind(this);
        this.deleteCollection = this.deleteCollection.bind(this);
    }

    changeCard(e) {

        let currentIndex = this.state.currentIndex;

        if (e.target !== undefined) {
            if (e.target.title === '前一個') {
                currentIndex = currentIndex - 1;
            } else {
                currentIndex = currentIndex + 1;
            }
        } else {
            if (e === 'left') {
                currentIndex = currentIndex - 1;
            } else {
                currentIndex = currentIndex + 1;
            }
        }

        if (currentIndex < this.props.collection.content.length && currentIndex >= 0) {
            this.setState({
                currentIndex: currentIndex,
                nextAnimation: 'ease'
            });
            setTimeout(() => {
                this.setState({ nextAnimation: '' });
            }, 500);
        }
    }

    deleteCheckHandler(e) {
        if (e.target.textContent === '刪除') {
            this.setState({ deleteCheck: true });
        } else {
            this.setState({ deleteCheck: false });
        }
    }

    deleteCollection(e) {
        this.setState({ deleteState: true, deleteCheck: false });
        let id = this.props.match.params.id;
        this.props.deleteCollection(id);
    }

    shuffleCards(e) {
        let newData = this.state.collection.content.slice();
        let temporaryValue, randomIndex;
        for (let i = 0; i < newData.length; i++) {
            // 讓random數字不超過陣列長度
            randomIndex = Math.floor(Math.random() * newData.length);
            // 儲存現在陣列位置的值，將現在陣列的位置改到random的位置並把原本的值放進random的位置裡
            temporaryValue = newData[i];
            newData[i] = newData[randomIndex];
            newData[randomIndex] = temporaryValue;
        }
        this.setState({
            collection: {
                ...this.state.collection,
                content: newData
            },
            currentIndex: 0,
            nextAnimation: 'ease'
        });
        setTimeout(() => {
            this.setState({ nextAnimation: '' });
        }, 500);
    }

    exchangeWordDef(e) {
        let exchangeData = this.state.collection.content.slice();
        let currentWord;
        for (let i = 0; i < exchangeData.length; i++) {
            currentWord = exchangeData[i].word;
            exchangeData[i].word = exchangeData[i].definition;
            exchangeData[i].definition = currentWord;
        }
        this.setState({
            collection: {
                ...this.state.collection,
                content: exchangeData
            },
            nextAnimation: 'ease'
        });
        setTimeout(() => {
            this.setState({ nextAnimation: '' });
        }, 500);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ collection: nextProps.collection });
    }

    render() {
        let card;
        let currentIndex = this.state.currentIndex;
        if (this.state.collection !== null) {
            card = [this.state.collection.content[currentIndex]];
        }

        if (this.state.deleteState) return <Redirect to='/' />

        return (
            <div className="content">
                <KeyboardEventHandler handleKeys={['right', 'left']} onKeyEvent={this.changeCard} />

                <div className="popup-overlay" style={{ display: this.state.deleteCheck ? 'flex' : 'none' }}>
                    <div className="deletecheck-popup">
                        確定要刪除此字卡集嗎？
                        <button className='cancel' onClick={this.deleteCheckHandler}>取消</button>
                        <button className='confirm' onClick={this.deleteCollection}>確定</button>
                        <div className='deletecheck-popup-background'></div>
                    </div>
                </div>

                <div className="wrap">
                    <div className='features'>
                        <Link className='feature_block' to={'/Test/' + this.props.match.params.id}>
                            <div className='card_test block_img'></div>
                            <div>字卡測驗</div>
                        </Link>
                        <Link className='feature_block'>
                            <div className='match_game block_img'></div>
                            <div>記憶遊戲</div>
                        </Link>
                        <Link className='feature_block'>
                            <div className='star_learning block_img'></div>
                            <div>重點學習</div>
                        </Link>
                    </div>

                    <div className="cards_content">

                        <div className='edit-feature'>
                            <div className='edit-feature_block' onClick={this.shuffleCards}>
                                <div className='shuffle_cards block_img' title='隨機順序'></div>
                            </div>
                            <div className='edit-feature_block' onClick={this.exchangeWordDef}>
                                <div className='exchange_cards block_img' title='詞語定義交換'></div>
                            </div>
                            <Link className='edit-feature_block' to={'/MakingCards/' + this.props.match.params.id}>
                                <div className='edit_collection block_img' title='編輯'></div>
                            </Link>
                            <div className='edit-feature_block' onClick={this.deleteCheckHandler}>
                                <div className='delete_collection block_img' title='刪除'>刪除</div>
                            </div>
                        </div>

                        {
                            this.state.collection && card.map((card, index) => {
                                return <Card
                                    key={index}
                                    label={index}
                                    word={card.word}
                                    definition={card.definition}
                                    currentIndex={currentIndex}
                                    length={this.props.collection.content.length}
                                    nextAnimation={this.state.nextAnimation}
                                    familiarity={card.familiarity}
                                />
                            })
                        }
                        <div className='arrows'>
                            <div className='left-arrow' onClick={this.changeCard} title='前一個' ></div>
                            <div className='right-arrow' onClick={this.changeCard} title='下一個' ></div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const collections = state.firestore.data.collection;
    const collection = collections ? collections[id] : null;
    return {
        collection: collection
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCollection: (id) => {
            dispatch(deleteCollection(id));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'collection' }
    ])
)(CollectionDetail);