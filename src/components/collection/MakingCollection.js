import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { addNewCollection, updateCollection } from '../../store/actions/collectionActions';
import { storage } from '../../firebase';
import MakingCard from './MakingCard';

class MakingCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collection: {
                title: '',
                public: true,
                word_lan: { lan: 'en-US', text: '英文' },
                definition_lan: { lan: 'en-US', text: '英文' },
                user_id: props.login.user_id,
                author: props.login.user_name,

                content: [{
                    word: '',
                    definition: '',
                    familiarity: 0,
                    highlight: false,
                    pictureURL: '',
                    pictureName: '',
                    empty: ''
                },
                {
                    word: '',
                    definition: '',
                    familiarity: 0,
                    highlight: false,
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

        this.changeTitle = this.changeTitle.bind(this);
        this.changePublicState = this.changePublicState.bind(this);
        this.changeWordLan = this.changeWordLan.bind(this);
        this.changeDefinitionLan = this.changeDefinitionLan.bind(this);
        this.wordChange = this.wordChange.bind(this);
        this.definitionChange = this.definitionChange.bind(this);
        this.addNewCard = this.addNewCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
        this.deleteImg = this.deleteImg.bind(this);
        this.submitCollection = this.submitCollection.bind(this);
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
                        highlight: false,
                        pictureURL: '',
                        pictureName: '',
                        empty: ''
                    }]
                }
            });
        }
    }

    uploadImg(card, e) {
        let newContentData = this.state.collection.content.slice();

        if (e.target.files[0]) {
            const image = (e.target.files[0]);
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
    }

    deleteImg(card) {
        let imageRef = storage.ref('images').child(card.pictureName);
        let newContentData = this.state.collection.content.slice();
        imageRef.delete().then(() => {
            newContentData[card.label].pictureURL = '';
            newContentData[card.label].pictureName = '';
            this.setState({
                collection: {
                    ...this.state.collection,
                    content: newContentData
                }
            });
            alert('圖片刪除成功');
        }).catch((error) => {
            alert('發生問題請再試一次');
            console.log(error);
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
        } else if (flag) {
            return;
        } else if (e.target.textContent === '建立') {
            this.props.addNewCollection(this.state.collection);
            this.setState({ submitOK: '建立' });
        } else if (e.target.textContent === '更新') {
            let id = this.props.match.params.id;
            this.props.updateCollection(this.state.collection, id);
            this.setState({ submitOK: '更新' });
        }
    }

    componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            this.setState({ collection: this.props.editCollection });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            if (this.props.match.params.id === 'new') {
                this.setState({
                    collection: {
                        title: '',
                        public: true,
                        word_lan: { lan: 'en-US', text: '英文' },
                        definition_lan: { lan: 'en-US', text: '英文' },
                        content: [{
                            word: '',
                            definition: '',
                            familiarity: 0,
                            highlight: false,
                            pictureURL: '',
                            pictureName: '',
                            empty: ''
                        },
                        {
                            word: '',
                            definition: '',
                            familiarity: 0,
                            highlight: false,
                            pictureURL: '',
                            pictureName: '',
                            empty: ''
                        }]
                    }
                });
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

        if (this.state.submitOK === '建立') {
            return <Redirect to='/' />
        } else if (this.state.submitOK === '更新') {
            return <Redirect to={'/Collection/' + this.props.match.params.id} />
        }

        return (
            <div className='content'>
                <div className='collection_info'>
                    <input placeholder='字卡集標題' onChange={this.changeTitle} style={{ borderBottom: this.state.borderBottom }} value={this.state.collection.title} />
                    <div className='select-box'>
                        <select onChange={this.changePublicState} value={publicState}>
                            <option value='open'>公開</option>
                            <option value='close'>不公開</option>
                        </select>
                        <img className='arrow' src='../../image/arrow.svg' />
                    </div>
                </div>
                <div className='add-from-file'><span> + 從檔案匯入</span></div>
                <div className='card_info'>
                    <div className='select-box'>
                        <select onChange={this.changeWordLan} value={this.state.collection.word_lan.lan}>
                            {
                                this.state.language.map((item, index) => {
                                    return <option key={index} value={item.lan}>{item.text}</option>
                                })
                            }
                        </select>
                        <img className='arrow' src='../../image/arrow.svg' />
                    </div>
                    <div className='select-box'>
                        <select onChange={this.changeDefinitionLan} value={this.state.collection.definition_lan.lan}>
                            {
                                this.state.language.map((item, index) => {
                                    return <option key={index} value={item.lan}>{item.text}</option>
                                })
                            }
                        </select>
                        <img className='arrow' src='../../image/arrow.svg' />
                    </div>
                    {
                        this.state.collection.content.map((content, index) => {
                            return <MakingCard
                                key={index}
                                label={index}
                                word={content.word}
                                definition={content.definition}
                                pictureName={content.pictureName}
                                wordChange={this.wordChange}
                                definitionChange={this.definitionChange}
                                deleteCard={this.deleteCard}
                                empty={content.empty}
                                uploadImg={this.uploadImg}
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
        login: state.login.loginState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewCollection: (collection) => {
            dispatch(addNewCollection(collection));
        },
        updateCollection: (collection, id) => {
            dispatch(updateCollection(collection, id));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'collection' }
    ])
)(MakingCollection);