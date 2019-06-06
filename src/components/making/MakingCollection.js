import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { addNewCollection, updateCollection, resetSubmitStatus } from '../../store/actions/collectionActions';
import { storage } from '../../firebase';
import MakingCard from './MakingCard';
import XLSX from 'xlsx';

class MakingCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: {
        title: '',
        public: true,
        word_lan: { lan: 'en-US', text: '英文' },
        definition_lan: { lan: 'en-US', text: '英文' },
        user_photo: this.props.login.user_photo,
        user_id: this.props.login.user_id,
        author: this.props.login.user_name,
        content: [{
          word: '',
          definition: '',
          familiarity: 0,
          pictureURL: '',
          pictureName: '',
          empty: ''
        },
        {
          word: '',
          definition: '',
          familiarity: 0,
          pictureURL: '',
          pictureName: '',
          empty: ''
        }]
      },
      borderBottom: '',
      submitOK: '',
      language: [
        { lan: 'en-US', text: '英文' },
        { lan: 'zh-TW', text: '中文' },
        { lan: 'ja-JP', text: '日文' },
        { lan: 'ko-KR', text: '韓文' },
        { lan: 'fr-FR', text: '法文' },
        { lan: 'hi-IN', text: '印度文' },
        { lan: 'pl-PL', text: '波蘭文' },
        { lan: 'id-ID', text: '印尼文' },
        { lan: 'nl-NL', text: '荷蘭文' },
        { lan: 'es-ES', text: '西班牙文' },
        { lan: 'it-IT', text: '義大利文' },
        { lan: 'pt-BR', text: '葡萄牙文' },
        { lan: 'ru-RU', text: '俄羅斯文' }
      ]
    }

    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changePublicState = this.changePublicState.bind(this);
    this.changeWordLan = this.changeWordLan.bind(this);
    this.changeDefinitionLan = this.changeDefinitionLan.bind(this);
    this.wordChange = this.wordChange.bind(this);
    this.definitionChange = this.definitionChange.bind(this);
    this.addNewCard = this.addNewCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.compressImg = this.compressImg.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
    this.deleteImg = this.deleteImg.bind(this);
    this.uploadXlsx = this.uploadXlsx.bind(this);
    this.submitCollection = this.submitCollection.bind(this);
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  changeTitle(e) {
    this.setState({
      collection: {
        ...this.state.collection,
        title: e.target.value
      },
      borderBottom: ''
    });
  }

  changePublicState(e) {
    if (e.target.value === 'open') {
      this.setState({
        collection: {
          ...this.state.collection,
          public: true
        }
      });
    } else {
      this.setState({
        collection: {
          ...this.state.collection,
          public: false
        }
      });
    }
  }

  changeWordLan(e) {
    let text;
    this.state.language.forEach(item => {
      if (item.lan === e.target.value) {
        text = item.text;
      }
    });
    this.setState({
      collection: {
        ...this.state.collection,
        word_lan: { lan: e.target.value, text: text }
      }
    });
  }

  changeDefinitionLan(e) {
    let text;
    this.state.language.forEach(item => {
      if (item.lan === e.target.value) {
        text = item.text;
      }
    });
    this.setState({
      collection: {
        ...this.state.collection,
        definition_lan: { lan: e.target.value, text: text }
      }
    });
  }

  wordChange(card, word) {
    let newContentData = this.state.collection.content.slice();
    newContentData[card.label].word = word;
    if (newContentData[card.label].empty !== '') {
      newContentData[card.label].empty = '';
    }
    this.setState({
      collection: {
        ...this.state.collection,
        content: newContentData
      }
    });
  }

  definitionChange(card, definition) {
    let newContentData = this.state.collection.content.slice();
    newContentData[card.label].definition = definition;
    if (newContentData[card.label].empty !== '') {
      newContentData[card.label].empty = '';
    }
    this.setState({
      collection: {
        ...this.state.collection,
        content: newContentData
      }
    });
  }

  addNewCard() {
    if (this.state.collection.content.length > 100) {
      alert('一個字卡集最多只能放置100個字');
    } else {
      this.setState({
        collection: {
          ...this.state.collection,
          content: [...this.state.collection.content,
          {
            word: '',
            definition: '',
            familiarity: 0,
            pictureURL: '',
            pictureName: '',
            empty: ''
          }]
        }
      });
    }
  }

  deleteCard(card) {
    let newContentData = this.state.collection.content.slice();
    newContentData.splice(card.label, 1);
    if (newContentData.length >= 2) {
      this.setState({
        collection: {
          ...this.state.collection,
          content: newContentData
        }
      });
    }
  }

  compressImg(card, e) {
    let oringinFile = e.target.files[0];
    this.getOrientation(oringinFile, (orientation) => {
      let reader = new FileReader();
      reader.readAsDataURL(oringinFile);
      reader.onload = (e) => {
        // 先建立image放入src
        let img = new Image();
        img.src = e.target.result;
        // 讀取img資料
        img.onload = () => {
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d');
          let width, height;

          // 確認圖片大小要不要縮小
          if (img.width > 299) {
            width = 300;
            let scaleFactor = 300 / img.width;
            height = img.height * scaleFactor;
          } else {
            width = img.width;
            height = img.height;
          }

          if (4 < orientation && orientation < 9) {
            canvas.width = height;
            canvas.height = width;
          } else {
            canvas.width = width;
            canvas.height = height;
          }

          // 如果方向不是正的就把它導正
          switch (orientation) {
            case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
            case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
            case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
            case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
            case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
            case 7: ctx.transform(0, -1, -1, 0, height, width); break;
            case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
            default: break;
          }

          // 繪製圖片
          ctx.drawImage(img, 0, 0, width, height);
          ctx.canvas.toBlob((blob) => {
            const compressFile = new File([blob], oringinFile.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            this.uploadImg(card, compressFile);
          }, 'image/jpeg', 1);
        }
      }
    });
  }

  getOrientation(file, callback) {
    // 取得圖片目前的旋轉方向
    let reader = new FileReader();
    reader.onload = function (e) {

      let view = new DataView(e.target.result);
      if (view.getUint16(0, false) !== 0xFFD8) {
        return callback(-2);
      }
      let length = view.byteLength, offset = 2;
      while (offset < length) {
        if (view.getUint16(offset + 2, false) <= 8) return callback(-1);
        let marker = view.getUint16(offset, false);
        offset += 2;
        if (marker === 0xFFE1) {
          if (view.getUint32(offset += 2, false) !== 0x45786966) {
            return callback(-1);
          }

          let little = view.getUint16(offset += 6, false) === 0x4949;
          offset += view.getUint32(offset + 4, little);
          let tags = view.getUint16(offset, little);
          offset += 2;
          for (let i = 0; i < tags; i++) {
            if (view.getUint16(offset + (i * 12), little) === 0x0112) {
              return callback(view.getUint16(offset + (i * 12) + 8, little));
            }
          }
        }
        else if ((marker & 0xFF00) !== 0xFF00) {
          break;
        }
        else {
          offset += view.getUint16(offset, false);
        }
      }
      return callback(-1);
    };
    reader.readAsArrayBuffer(file);
  }

  uploadImg(card, image) {
    let newContentData = this.state.collection.content.slice();
    // 在檔名加上時間以免檔名相同檔案被覆蓋
    let name = new Date().getTime() + image.name;
    const uplaodTask = storage.ref(`images/${name}`).put(image);
    uplaodTask.on('state_changed',
      () => {
        newContentData[card.label].pictureName = 'loading';
        this.setState({
          collection: {
            ...this.state.collection,
            content: newContentData
          }
        });
      },
      (error) => {
        alert('圖片上傳發生問題請再試一次');
        console.log(error);
      },
      () => {
        storage.ref('images').child(name).getDownloadURL().then(url => {
          newContentData[card.label].pictureURL = url;
          newContentData[card.label].pictureName = name;
          this.setState({
            collection: {
              ...this.state.collection,
              content: newContentData
            }
          });
        })
      }
    )
  }

  deleteImg(card) {
    let newContentData = this.state.collection.content.slice();
    newContentData[card.label].pictureURL = '';
    newContentData[card.label].pictureName = '';
    this.setState({
      collection: {
        ...this.state.collection,
        content: newContentData
      }
    });
    let id = this.props.match.params.id;
    if (id === 'new') {
      this.deleteImgFromStorage(card.pictureName);
    }
  }

  deleteImgFromStorage(pictureName) {
    let imageRef = storage.ref('images').child(pictureName);
    imageRef.delete().then(() => {
      console.log('圖片從資料庫刪除成功');
    }).catch((error) => {
      alert('發生問題請再試一次');
      console.log(error);
    });
  }

  uploadXlsx(e) {
    let newContentData = [];
    let files = e.target.files, f = files[0];
    if (files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, { type: 'array' });
        let first_sheet_name = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[first_sheet_name];
        for (let i = 1; i < 101; i++) {
          if (worksheet[`A${i}`] === undefined) {
            break;
          }
          newContentData.push({
            word: worksheet[`A${i}`].v,
            definition: worksheet[`B${i}`].v,
            familiarity: 0,
            pictureURL: '',
            pictureName: '',
            empty: ''
          });
        }
        this.setState({
          collection: {
            ...this.state.collection,
            content: newContentData
          }
        });
      };
      reader.readAsArrayBuffer(f);
    }
  }

  submitCollection(e) {
    let content = this.state.collection.content.slice();
    let emptyWordOrDef = false;

    for (let i = 0; i < content.length; i++) {
      if (content[i].word === '' || content[i].definition === '') {
        content[i].empty = '3px solid red';
        emptyWordOrDef = true;
      }
    }

    this.setState({
      collection: {
        ...this.state.collection,
        content: content
      }
    });

    if (this.state.collection.title === '') {
      this.setState({ borderBottom: '3px solid red' });
      this.focusTextInput();
    } else if (emptyWordOrDef) {
      return;
    } else if (e.target.textContent === '建立') {
      this.props.addNewCollection(this.state.collection, '建立');
    } else if (e.target.textContent === '更新') {
      let id = this.props.match.params.id;
      this.props.updateCollection(this.state.collection, id, '更新');
    }
  }

  componentDidMount() {
    if (this.props.match.params.id !== 'new' && this.props.editCollection !== null) {
      this.setState({ collection: this.props.editCollection });
    }
    this.props.resetSubmitStatus();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({ submitOK: this.props.submitStatus });
      if (this.props.match.params.id !== 'new' && this.props.editCollection !== null) {
        this.setState({ collection: this.props.editCollection });
      }
    }
  }

  render() {
    let submitType;
    if (this.props.match.params.id === 'new') {
      submitType = true;
    } else {
      submitType = false;
    }

    let publicState = this.state.collection.public;
    if (publicState) {
      publicState = 'open';
    } else {
      publicState = 'close';
    }

    // 建立完成、未登入或訪客模式都重新導向到首頁
    if (this.state.submitOK === '建立' || !this.props.login.login || this.props.login.user_id === 'anonymous') {
      return <Redirect to='/' />
    } else if (this.state.submitOK === '更新') {
      return <Redirect to={'/Collection/' + this.props.match.params.id} />
    }

    return (
      <div className='content'>
        <div className='collection_info'>
          <input placeholder='字卡集標題' ref={this.textInput} onChange={this.changeTitle} style={{ borderBottom: this.state.borderBottom }} value={this.state.collection.title} />
          <div className='select-box'>
            <select onChange={this.changePublicState} value={publicState}>
              <option value='open'>公開</option>
              <option value='close'>不公開</option>
            </select>
          </div>
        </div>

        <div className='add-from-file'>
          <label onChange={this.uploadXlsx}> + 從 xlsx 檔案匯入<span style={{ color: 'silver' }}>（請將詞語放置 A 欄，定義放置 B 欄）</span>
            <input type='file' style={{ display: 'none' }} accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' />
          </label>
        </div>

        <div className='card_info'>
          <div className='select-box'>
            <select onChange={this.changeWordLan} value={this.state.collection.word_lan.lan}>
              {
                this.state.language.map((item, index) => {
                  return <option key={index} value={item.lan}>{item.text}</option>
                })
              }
            </select>
          </div>
          <div className='select-box'>
            <select onChange={this.changeDefinitionLan} value={this.state.collection.definition_lan.lan}>
              {
                this.state.language.map((item, index) => {
                  return <option key={index} value={item.lan}>{item.text}</option>
                })
              }
            </select>
          </div>
          {
            this.state.collection.content.map((content, index) => {
              return <MakingCard
                key={index}
                label={index}
                word={content.word}
                definition={content.definition}
                pictureName={content.pictureName}
                pictureURL={content.pictureURL}
                wordChange={this.wordChange}
                definitionChange={this.definitionChange}
                deleteCard={this.deleteCard}
                empty={content.empty}
                compressImg={this.compressImg}
                deleteImg={this.deleteImg}
              />
            })
          }
          <div className='add_card' onClick={this.addNewCard}><span> + 新增單詞卡</span></div>
        </div>
        <button onClick={this.submitCollection} style={{ display: submitType ? 'block' : 'none' }}>建立</button>
        <button onClick={this.submitCollection} style={{ display: submitType ? 'none' : 'block' }}>更新</button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const collections = state.firestore.data.collection;
  const collection = collections ? collections[id] : null;
  return {
    editCollection: collection,
    login: state.login.loginState,
    submitStatus: state.collection.submitStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewCollection: (collection, typeStr) => {
      dispatch(addNewCollection(collection, typeStr));
    },
    updateCollection: (collection, id, typeStr) => {
      dispatch(updateCollection(collection, id, typeStr));
    },
    resetSubmitStatus: () => {
      dispatch(resetSubmitStatus())
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'collection' }
  ])
)(MakingCollection);