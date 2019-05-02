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
        this.state = {
            pageLocation: "self",
            selfActive: "page_active",
            wholeActive: ""
        }
        this.changePage = this.changePage.bind(this);
    }

    changePage(e) {
        if (e.target.textContent === "全站近期新增") {
            this.setState({ pageLocation: "whole", selfActive: "", wholeActive: "page_active" });
        } else {
            this.setState({ pageLocation: "self", selfActive: "page_active", wholeActive: "" });
        }
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

        if (collectionInfo !== undefined) {

            if (this.state.pageLocation === "self") {
                collectionInfo = collectionInfo.filter(item => item.user_id === user_uid);
            } else {
                collectionInfo = collectionInfo.filter(item => item.public);
                collectionInfo.splice(9);
            }

            // 判斷有沒有創建過字卡集
            if (collectionInfo.length === 0) {
                this.props.alreadyHadCollection(false);
            } else {
                this.props.alreadyHadCollection(true);
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
                <div className="page_location" style={{ display: this.props.login.login ? 'flex' : 'none' }}>
                    <div onClick={this.changePage} className={this.state.selfActive}>你的字卡集</div>
                    <span>|</span>
                    <div onClick={this.changePage} className={this.state.wholeActive}>全站近期新增</div>
                </div>
                <Link style={{ display: addNewDisplay ? 'none' : 'flex' }} to='/MakingCards/new' className='new_card' exact></Link>
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
                            user_photo={collection.user_photo}
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