import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { alreadyHadCollection, getCollection } from '../store/actions/collectionActions';
import Collection from './collection/Collection';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        this.props.getCollection();

        if (nextProps.collectionInfo.length === 0) {
            this.props.alreadyHadCollection(false);
        }
    }

    render() {
        return (
            <div className='content'>
                <div className="white-overlay" style={{ display: this.props.getData ? 'none' : 'flex' }} >
                    <img className='loading' src='../../image/loading.gif' />
                </div>
                <div className="white-overlay" style={{ display: this.props.hadCollection ? 'none' : 'flex' }}>
                    <Link to='/MakingCards/new' className='new_card' exact></Link>
                </div>

                {
                    this.props.collectionInfo && this.props.collectionInfo.map((collection, index) => {
                        return <Collection
                            key={index}
                            label={index}
                            title={collection.title}
                            contentLength={collection.content.length}
                            wordLan={collection.word_lan}
                            defLan={collection.definition_lan}
                            author={collection.author}
                            time={collection.timestamp}
                            id={collection.id}
                        />
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        hadCollection: state.collection.collectionEmpty,
        getData: state.collection.getCollection,
        collectionInfo: state.firestore.ordered.collection
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        alreadyHadCollection: (status) => {
            dispatch(alreadyHadCollection(status));
        },
        getCollection: () => {
            dispatch(getCollection());
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'collection' }
    ])
)(Dashboard);