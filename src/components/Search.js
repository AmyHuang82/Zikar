import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { alreadyHadCollection, getCollection } from '../store/actions/collectionActions';
import Collection from './collection/Collection';

class Search extends React.Component {
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
        let pageLocation = '';

        let keyword = this.props.match.params.keyword;
        if (collectionInfo !== undefined) {
            collectionInfo = collectionInfo.filter(item => item.user_id === user_uid || item.public);
            collectionInfo = collectionInfo.filter(item => item.title.includes(keyword));
            if (collectionInfo.length === 0) {
                searchEmpty = true;
                pageLocation = '';
            } else {
                pageLocation = <div className="page_location">搜尋結果（{collectionInfo.length}）</div>;
            }
        }

        return (
            <div className='content'>
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
                <h2 className='search_none' style={{ display: searchEmpty ? 'block' : 'none' }}>抱歉！無此關鍵字字卡集<br />請使用其他關鍵字試試看</h2>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
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
)(Search);