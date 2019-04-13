import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Card from './Card';
import { deleteCollection } from '../../store/actions/collectionActions';

class CollectionDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            nextAnimation: '',
            deleteState: false
        }
        this.changeCard = this.changeCard.bind(this);
        this.deleteCollection = this.deleteCollection.bind(this);
    }

    changeCard(e) {
        let currentIndex = this.state.currentIndex;
        if (e.target.title === '前一個') {
            currentIndex = currentIndex - 1;
        } else {
            currentIndex = currentIndex + 1;
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

    deleteCollection(e) {
        this.setState({ deleteState: true });
        let id = this.props.match.params.id;
        this.props.deleteCollection(id);
    }

    render() {
        let card;
        let currentIndex = this.state.currentIndex;
        if (this.props.collection !== null) {
            card = [this.props.collection.content[currentIndex]];
        }

        return (
            <div className="content">
                <div className="white-overlay-cover" style={{ display: this.state.deleteState ? 'flex' : 'none' }} >
                    <img className='loading' src='../../image/loading.gif' />
                </div>
                <Link to={'/MakingCards/' + this.props.match.params.id}>編輯</Link>
                <div onClick={this.deleteCollection}>刪除</div>
                <div className="cards_content">
                    {
                        this.props.collection && card.map((card, index) => {
                            return <Card
                                key={index}
                                label={index}
                                word={card.word}
                                definition={card.definition}
                                currentIndex={currentIndex}
                                length={this.props.collection.content.length}
                                nextAnimation={this.state.nextAnimation}
                            />
                        })
                    }
                </div>
                <div className='arrows'>
                    <div className='left-arrow' onClick={this.changeCard} title='前一個' ></div>
                    <div className='right-arrow' onClick={this.changeCard} title='下一個' ></div>
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