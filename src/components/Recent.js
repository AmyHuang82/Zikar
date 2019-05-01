import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { getCollection } from '../store/actions/collectionActions';
import Collection from './collection/Collection';

class Recent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCollectionNumber: ''
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.props.getCollection();
        }
    }

    render() {
        if (!this.props.login.login) return <Redirect to='/' />

        let collectionInfo = this.props.collectionInfo;

        if (collectionInfo !== undefined) {
            collectionInfo = collectionInfo.filter(item => item.public);
            collectionInfo.splice(9);
        }

        return (
            <div className='content'>

                <div className="page_location">全站近期新增</div>
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
        getData: state.collection.getCollection,
        collectionInfo: state.firestore.ordered.collection,
        login: state.login.loginState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
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
)(Recent);