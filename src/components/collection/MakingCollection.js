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
                user_id: '',
                author: '',

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

    compressImg(card, e) {
        let oringinFile = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(oringinFile);
        reader.onload = (e) => {
            // 先建立image放入src
            let img = new Image();
            img.src = e.target.result;
            // 讀取img資料
            img.onload = () => {
                if (img.width > 299) {
                    // 建立canvas並開始設定
                    const elem = document.createElement('canvas');
                    const width = 300;
                    // 維持比例
                    const scaleFactor = width / img.width;
                    elem.width = width;
                    elem.height = img.height * scaleFactor;
                    const ctx = elem.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
                    ctx.canvas.toBlob((blob) => {
                        const compressFile = new File([blob], oringinFile.name, {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });
                        this.uploadImg(card, compressFile);
                    }, 'image/jpeg', 1);
                } else {
                    this.uploadImg(card, oringinFile);
                }
            }
        }
    }

    uploadImg(card, image) {
        let newContentData = this.state.collection.content.slice();
        let name = new Date().getTime() + image.name;
        const uplaodTask = storage.ref(`images/${name}`).put(image);
        uplaodTask.on('state_changed',
            () => {
                // console.log(snapshot);
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

    uploadXlsx(e) {
        let newContentData = [];
        let files = e.target.files, f = files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, { type: 'array' });
            for (let i = 0; i < workbook.Strings.length - 1; i++) {
                if (i % 2 === 0) {
                    newContentData.push({
                        word: workbook.Strings[i].t,
                        definition: workbook.Strings[i + 1].t,
                        familiarity: 0,
                        pictureURL: '',
                        pictureName: '',
                        empty: ''
                    });
                }
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

    submitCollection(e) {
        let content = this.state.collection.content.slice();
        let flag = false;

        for (let i = 0; i < content.length; i++) {
            if (content[i].word === '' || content[i].definition === '') {
                content[i].empty = '3px solid red';
                flag = true;
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
        } else if (flag) {
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
            if (this.props.match.params.id === 'new') {
                this.setState({
                    collection: {
                        title: '',
                        public: true,
                        word_lan: { lan: 'en-US', text: '英文' },
                        definition_lan: { lan: 'en-US', text: '英文' },
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
                    }
                });
            } else {
                if (this.props.editCollection !== null) {
                    this.setState({ collection: this.props.editCollection });
                }
            }
        }
    }

    render() {
        let flag;
        if (this.props.match.params.id === 'new') {
            flag = true;
        } else {
            flag = false;
        }

        let publicState = this.state.collection.public;
        if (publicState) {
            publicState = 'open';
        } else {
            publicState = 'close';
        }

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
                        <input type='file' style={{ display: 'none' }} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
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
                <button onClick={this.submitCollection} style={{ display: flag ? 'block' : 'none' }}>建立</button>
                <button onClick={this.submitCollection} style={{ display: flag ? 'none' : 'block' }}>更新</button>
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