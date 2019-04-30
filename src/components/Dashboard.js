import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { alreadyHadCollection, getCollection } from '../store/actions/collectionActions';
import Collection from './collection/Collection';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.props.getCollection();
        }
    }

    render() {
        let user_uid = this.props.login.user_id;
        let collectionInfo = this.props.collectionInfo;
        let addNewDisplay = true;
        let pageLocation = '';

        if (collectionInfo !== undefined) {
            collectionInfo = collectionInfo.filter(item => item.user_id === user_uid);
            if (collectionInfo.length === 0) {
                this.props.alreadyHadCollection(false);
                pageLocation = '';
            } else {
                this.props.alreadyHadCollection(true);
                pageLocation = <div className="page_location">你的字卡集（{collectionInfo.length}）</div>;
            }
            addNewDisplay = this.props.hadCollection;
        }

        if (user_uid === 'anonymous') {
            return <Redirect to='/Recent/' />
        }

        return (
            <div className='content'>
                <div className="white-overlay" style={{ display: this.props.getData ? 'none' : 'none' }} >
                    <img className='loading' src='../../image/loading.gif' />
                </div>
                <div className="white-overlay" style={{ display: addNewDisplay ? 'none' : 'flex' }}>
                    <Link to='/MakingCards/new' className='new_card' exact></Link>
                </div>

                {pageLocation}
                {
                    collectionInfo && collectionInfo.map((collection, index) => {
                        return <Collection
                            key={index}
                            label={index}
                            title={collection.title}
                            contentLength={collection.content.length}
                            wordLan={collection.word_lan.text}
                            defLan={collection.definition_lan.text}
                            author={collection.author}
                            time={collection.timestamp}
                            id={collection.id}
                            public={collection.public}
                            copyFromOther={collection.copyFromOther}
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
        collectionInfo: state.firestore.ordered.collection,
        login: state.login.loginState
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
        { collection: 'collection', orderBy: ['timestamp', 'desc'] }
    ])
)(Dashboard);