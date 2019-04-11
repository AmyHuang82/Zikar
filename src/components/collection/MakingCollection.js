import React from 'react';
import ShortUniqueId from 'short-unique-id';
import { connect } from 'react-redux';
import { addNewCollection } from '../../store/actions/collectionActions';
import MakingCard from './MakingCard';

class MakingCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collection: {
                title: '',
                public: true,
                word_lan: '英文',
                definition_lan: '英文',
                content: [{
                    word: '',
                    definition: '',
                    correct_times: 0,
                    wrong_times: 0,
                    highlight: false,
                    picture: '',
                    empty: ''
                },
                {
                    word: '',
                    definition: '',
                    correct_times: 0,
                    wrong_times: 0,
                    highlight: false,
                    picture: '',
                    empty: ''
                }]
            },
            borderBottom: ''
        }

        this.changeTitle = this.changeTitle.bind(this);
        this.changePublicState = this.changePublicState.bind(this);
        this.changeWordLan = this.changeWordLan.bind(this);
        this.changeDefinitionLan = this.changeDefinitionLan.bind(this);
        this.wordChange = this.wordChange.bind(this);
        this.definitionChange = this.definitionChange.bind(this);
        this.addNewCard = this.addNewCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.addNewCollection = this.addNewCollection.bind(this);
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
        this.setState({
            collection: {
                ...this.state.collection,
                word_lan: e.target.value
            }
        });
    }

    changeDefinitionLan(e) {
        this.setState({
            collection: {
                ...this.state.collection,
                definition_lan: e.target.value
            }
        });
    }

    wordChange(card, word, e) {
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

    definitionChange(card, definition, e) {
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

    addNewCard(e) {
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
                        correct_times: 0,
                        wrong_times: 0,
                        highlight: false,
                        picture: '',
                        empty: ''
                    }]
                }
            });
        }
    }

    deleteCard(card, e) {
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

    addNewCollection(e) {
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
        } else {
            this.props.addNewCollection(this.state.collection);
        }
    }

    render() {
        const uid = new ShortUniqueId();

        return (
            <div className='content'>
                <div className='collection_info'>
                    <input placeholder='字卡集標題' onChange={this.changeTitle} style={{ borderBottom: this.state.borderBottom }} />
                    <div className='select-box'>
                        <select onChange={this.changePublicState}>
                            <option value='open'>公開</option>
                            <option value='close'>不公開</option>
                        </select>
                        <img className='arrow' src='../../image/arrow.svg' />
                    </div>
                </div>
                <div className='add-from-file'><span> + 從檔案匯入</span></div>
                <div className='card_info'>
                    <div className='select-box'>
                        <select onChange={this.changeWordLan}>
                            <option value='英文'>英文</option>
                            <option value='中文'>中文</option>
                        </select>
                        <img className='arrow' src='../../image/arrow.svg' />
                    </div>
                    <div className='select-box'>
                        <select onChange={this.changeDefinitionLan}>
                            <option value='英文'>英文</option>
                            <option value='中文'>中文</option>
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
                                wordChange={this.wordChange}
                                definitionChange={this.definitionChange}
                                deleteCard={this.deleteCard}
                                empty={content.empty}
                            />
                        })
                    }
                    <div className='add_card' onClick={this.addNewCard}><span> + 新增單詞卡</span></div>
                </div>
                <button onClick={this.addNewCollection}>建立</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewCollection: (collection) => {
            dispatch(addNewCollection(collection));
        }
    }
}

export default connect(null, mapDispatchToProps)(MakingCollection);