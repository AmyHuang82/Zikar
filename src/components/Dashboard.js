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

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.props.getCollection();
        }
    }

    render() {
        let user_uid = this.props.login.user_id;
        let collectionInfo = this.props.collectionInfo;
        let searchEmpty = false;

        if (this.props.match.path === '/') {
            if (collectionInfo !== undefined) {
                collectionInfo = collectionInfo.filter(item => item.user_id === user_uid);
                if (collectionInfo.length === 0) {
                    this.props.alreadyHadCollection(false);
                } else {
                    this.props.alreadyHadCollection(true);
                }
            }
        } else {
            let keyword = this.props.match.params.keyword;
            if (collectionInfo !== undefined) {
                collectionInfo = collectionInfo.filter(item => item.user_id === user_uid || item.public);
                collectionInfo = collectionInfo.filter(item => item.title.includes(keyword));
                if (collectionInfo.length === 0) {
                    searchEmpty = true;
                }
            }
        }

        return (
            <div className='content'>
                <div className="white-overlay" style={{ display: this.props.getData ? 'none' : 'none' }} >
                    <img className='loading' src='../../image/loading.gif' />
                </div>
                <div className="white-overlay" style={{ display: this.props.hadCollection ? 'none' : 'flex' }}>
                    <Link to='/MakingCards/new' className='new_card' exact></Link>
                </div>

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
                <h2 className='search_none' style={{ display: searchEmpty ? 'block' : 'none' }}>抱歉！無此關鍵字字卡集<br />請使用其他關鍵字試試看</h2>
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