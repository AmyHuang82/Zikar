import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Card from './Card';
import { deleteCollection, copyToSelfCollection } from '../../store/actions/collectionActions';

class CollectionDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collection: null,
      currentIndex: 0,
      nextAnimation: '',
      deleteCollectionState: false,
      deleteConfirm: false,
      mobile: false,
      showHotKeyHint: false
    }
    this.keyHandle = this.keyHandle.bind(this);
    this.copyHandler = this.copyHandler.bind(this);
    this.shuffleCards = this.shuffleCards.bind(this);
    this.changeCard = this.changeCard.bind(this);
    this.showKeyHint = this.showKeyHint.bind(this);
    this.exchangeWordDef = this.exchangeWordDef.bind(this);
    this.deleteConfirmHandler = this.deleteConfirmHandler.bind(this);
    this.deleteCollection = this.deleteCollection.bind(this);
  }

  keyHandle(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      this.changeCard(e);
    }
  }

  copyHandler() {
    let user = this.props.login;
    let id = this.props.match.params.id;
    this.props.copyToSelfCollection(id, user);
  }

  shuffleCards() {
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

  changeCard(e) {
    let currentIndex = this.state.currentIndex;

    if (e.key === undefined) {
      if (e.target.title === '前一個') {
        currentIndex = currentIndex - 1;
      } else {
        currentIndex = currentIndex + 1;
      }
    } else {
      if (e.key === 'ArrowLeft') {
        currentIndex = currentIndex - 1;
      } else if (e.key === 'ArrowRight') {
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

  showKeyHint() {
    this.setState((prevState) => ({ showHotKeyHint: !prevState.showHotKeyHint }));
  }

  exchangeWordDef() {
    // 把字交換
    let exchangeData = this.state.collection.content.slice();
    let currentWord;
    for (let i = 0; i < exchangeData.length; i++) {
      currentWord = exchangeData[i].showWord;
      exchangeData[i].showWord = exchangeData[i].showDef;
      exchangeData[i].showDef = currentWord;
    }
    // 把語言交換
    let currentWordLan = this.state.collection.word_lan;
    let currentDefLan = currentWordLan;
    currentWordLan = this.state.collection.definition_lan;
    this.setState({
      collection: {
        ...this.state.collection,
        word_lan: currentWordLan,
        definition_lan: currentDefLan,
        content: exchangeData
      },
      nextAnimation: 'ease'
    });
    setTimeout(() => {
      this.setState({ nextAnimation: '' });
    }, 500);
  }

  deleteConfirmHandler(e) {
    if (e.target.textContent === '刪除') {
      this.setState({ deleteConfirm: true });
    } else {
      this.setState({ deleteConfirm: false });
    }
  }

  deleteCollection() {
    this.setState({ deleteCollectionState: true, deleteConfirm: false });
    let id = this.props.match.params.id;
    this.props.deleteCollection(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.collection !== prevProps.collection) {
      // 設定showWord與showDef
      let newContent = this.props.collection.content.slice();
      for (let i = 0; i < newContent.length; i++) {
        newContent[i].showWord = newContent[i].word;
        newContent[i].showDef = newContent[i].definition;
      }
      this.setState({
        collection: {
          ...this.props.collection,
          content: newContent
        }
      });
    }
  }

  componentDidMount() {
    let mobile = !!navigator.userAgent && /(mobile)/i.test(navigator.userAgent);
    if (mobile) {
      this.setState({ mobile: true });
    }
    document.body.addEventListener('keyup', this.keyHandle);
    if (this.props.collection !== null) {
      // 設定showWord與showDef
      let newContent = this.props.collection.content.slice();
      for (let i = 0; i < newContent.length; i++) {
        newContent[i].showWord = newContent[i].word;
        newContent[i].showDef = newContent[i].definition;
      }
      this.setState({
        collection: {
          ...this.props.collection,
          content: newContent
        }
      });
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('keyup', this.keyHandle);
  }

  render() {
    let card;
    let currentIndex = this.state.currentIndex;
    let notSelf = false;
    let publicClose = false;
    let user_uid = this.props.login.user_id;
    let copyCollectionBtn;

    if (this.state.collection !== null) {
      card = [this.state.collection.content[currentIndex]];

      if (this.state.collection.user_id !== user_uid) {
        notSelf = true;
        copyCollectionBtn =
          <div className='feature_block' style={{ display: notSelf ? 'flex' : 'none' }} onClick={this.copyHandler}>
            <div className='add_to_learn block_img'></div>
            <div>複製學習</div>
          </div>;
        if (!this.state.collection.public) {
          publicClose = true;
        }
      }

      if (user_uid === 'anonymous') {
        copyCollectionBtn = '';
      }
    }

    if (this.state.deleteCollectionState || publicClose || !this.props.login.login) return <Redirect to='/' />

    return (
      <div className='content'>
        <div className='popup-overlay' style={{ display: this.state.deleteConfirm ? 'flex' : 'none' }}>
          <div className='deletecheck-popup'>
            確定要刪除此字卡集嗎？
                        <button className='cancel' onClick={this.deleteConfirmHandler}>取消</button>
            <button className='confirm' onClick={this.deleteCollection}>確定</button>
            <div className='deletecheck-popup-background'></div>
          </div>
        </div>

        <div className='popup-overlay' style={{ display: this.state.showHotKeyHint ? 'flex' : 'none' }}>
          <div className='deletecheck-popup hot_key_popup'>
            <div className='key_description'><div className='keyarrow'>←</div>前一個</div>
            <div className='key_description'><div className='keyarrow'>→</div>下一個</div>
            <div className='key_description'><div className='keyarrow'>↑</div>翻字卡</div>
            <div className='key_description'><div className='keyarrow'>↓</div>聽發音</div>
            <button className='cancel' onClick={this.showKeyHint}>知道了</button>
            <div className='deletecheck-popup-background'></div>
          </div>
        </div>

        <div className='wrap'>
          <div className='features'>
            <Link className='feature_block' to={'/Test/' + this.props.match.params.id} style={{ display: notSelf ? 'none' : 'flex' }}>
              <div className='card_test block_img'></div>
              <div>字卡測驗</div>
            </Link>
            {copyCollectionBtn}
            <Link className='feature_block' to={'/MatchGame/' + this.props.match.params.id}>
              <div className='match_game block_img'></div>
              <div>配對遊戲</div>
            </Link>
            <Link className='feature_block' onClick={this.shuffleCards}>
              <div className='shuffle_card block_img'></div>
              <div>隨機順序</div>
            </Link>
          </div>

          <div className='cards_content'>

            <div className='edit-feature'>
              <div className='edit-feature_block' onClick={this.showKeyHint} style={{ display: this.state.mobile ? 'none' : 'block' }}>
                <div className='hot_key block_img' title='快捷鍵說明'></div>
              </div>
              <div className='edit-feature_block' onClick={this.exchangeWordDef}>
                <div className='exchange_cards block_img' title='詞語定義交換'></div>
              </div>
              <Link className='edit-feature_block' to={'/MakingCards/' + this.props.match.params.id} style={{ display: notSelf ? 'none' : 'block' }}>
                <div className='edit_collection block_img' title='編輯'></div>
              </Link>
              <div className='edit-feature_block' onClick={this.deleteConfirmHandler} style={{ display: notSelf ? 'none' : 'block' }}>
                <div className='delete_collection block_img' title='刪除'>刪除</div>
              </div>
            </div>

            {
              this.state.collection && card.map((card, index) => {
                return <Card
                  key={index}
                  currentIndex={currentIndex}
                  word={card.showWord}
                  definition={card.showDef}
                  picture={card.pictureURL}
                  familiarity={card.familiarity}
                  word_lan={this.state.collection.word_lan.lan}
                  definition_lan={this.state.collection.definition_lan.lan}
                  nextAnimation={this.state.nextAnimation}
                  length={this.props.collection.content.length}
                  notSelf={notSelf}
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
    collection: collection,
    login: state.login.loginState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    copyToSelfCollection: (id, user) => {
      dispatch(copyToSelfCollection(id, user));
    },
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