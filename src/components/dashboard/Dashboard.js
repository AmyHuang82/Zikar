import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { alreadyHadCollection } from '../../store/actions/collectionActions';
import Collection from './Collection';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLocation: 'self',
      selfActive: 'page_active',
      wholeActive: '',
      guestMode: false,
    };
    this.changePage = this.changePage.bind(this);
  }

  changePage(e) {
    if (e.target.textContent === '你的字卡集') {
      this.setState({
        pageLocation: 'self',
        selfActive: 'page_active',
        wholeActive: '',
      });
    } else {
      this.setState({
        pageLocation: 'whole',
        selfActive: '',
        wholeActive: 'page_active',
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.login.user_id === 'anonymous') {
        this.setState({
          pageLocation: 'whole',
          selfActive: '',
          wholeActive: 'page_active',
          guestMode: true,
        });
      }
    }
  }

  render() {
    let user_uid = this.props.login.user_id;
    let collectionInfo = this.props.collectionInfo;
    let addNewDisplay = true;

    if (collectionInfo !== undefined) {
      if (this.state.pageLocation === 'self') {
        collectionInfo = collectionInfo.filter(
          (item) => item.user_id === user_uid
        );
      } else {
        collectionInfo = collectionInfo.filter((item) => item.public);
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

    return (
      <div className="content">
        <div
          className="page_location"
          style={{ display: this.props.login.login ? 'flex' : 'none' }}
        >
          <div
            onClick={this.changePage}
            className={this.state.selfActive}
            style={{ display: this.state.guestMode ? 'none' : 'block' }}
          >
            你的字卡集
          </div>
          <span style={{ display: this.state.guestMode ? 'none' : 'block' }}>
            |
          </span>
          <div
            onClick={this.changePage}
            className={this.state.wholeActive}
            style={{ marginLeft: this.state.guestMode ? 0 : '10px' }}
          >
            全站近期新增
          </div>
        </div>
        <div
          style={{
            display: this.props.login.login ? 'flex' : 'none',
            width: '100%',
          }}
        >
          <div
            style={{ display: addNewDisplay ? 'none' : 'flex' }}
            className="first_time_hint"
          >
            <h3>任選一個方式開始吧！</h3>
            <Link to="/MakingCards/new" exact className="collection">
              <div className="wrap_new">
                <div className="search_lan new_card"></div>
                <p>新建自己的字卡</p>
              </div>
            </Link>
            <div onClick={this.changePage} className="collection">
              <div className="wrap_new">
                <div className="search_lan recent_card"></div>
                <p>看看其他人的字卡</p>
              </div>
            </div>
            <div className="collection">
              <div className="wrap_new">
                <Link
                  className="search_lan english"
                  to="/Search/英文"
                  exact
                ></Link>
                <Link
                  className="search_lan japanese"
                  to="/Search/日文"
                  exact
                ></Link>
                <Link
                  className="search_lan korean"
                  to="/Search/韓文"
                  exact
                ></Link>
                <p>搜尋特定語言</p>
              </div>
            </div>
          </div>
        </div>
        {collectionInfo &&
          collectionInfo.map((collection, index) => {
            return (
              <Collection
                key={index}
                title={collection.title}
                contentLength={collection.content.length}
                wordLan={collection.word_lan.text}
                defLan={collection.definition_lan.text}
                author={collection.author}
                id={collection.id}
                public={collection.public}
                user_photo={collection.user_photo}
              />
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hadCollection: state.collection.collectionEmpty,
    collectionInfo: state.firestore.ordered.collection,
    login: state.login.loginState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    alreadyHadCollection: (status) => {
      dispatch(alreadyHadCollection(status));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'collection', orderBy: ['timestamp', 'desc'] },
  ])
)(Dashboard);
