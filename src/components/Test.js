import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { updateCollection } from '../store/actions/collectionActions';

class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            output: '',
            allNewRound: this.props.allNewRound,
            randomIndexArray: '',
            questionCount: 0,
            answer: '',
            roundStart: false,
            doneTest: this.props.doneTest
        }
        this.changeAnswer = this.changeAnswer.bind(this);
        this.testStart = this.testStart.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.restartTest = this.restartTest.bind(this);
    }

    changeAnswer(e) {
        this.setState({ answer: e.target.value });
    }

    testStart(e) {
        this.setState({ allNewRound: false });
        // 紀錄正確的index，判斷熟悉度是不是100了，把熟悉度不是100的隨機放入長度為6的陣列裡
        let newArray = [];
        for (let i = 0; i < this.props.collection.content.length; i++) {
            newArray.push({ index: i, familiarity: this.props.collection.content[i].familiarity });
        }
        // 去除熟悉度已經是100的詞語
        newArray = newArray.filter(item => item.familiarity < 100);
        // 計算剩下的詞語差100還有多少，複製剩下的次數
        let randomArray = [];
        if (newArray.length > 0) {
            for (let i = 0; i < newArray.length; i++) {
                let times = (100 - newArray[i].familiarity) / 20;
                for (let j = 0; j < times; j++) {
                    randomArray.push(newArray[i]);
                }
            }
        }
        let temporaryValue, randomIndex;
        for (let i = 0; i < randomArray.length; i++) {
            randomIndex = Math.floor(Math.random() * randomArray.length);
            temporaryValue = randomArray[i];
            randomArray[i] = randomArray[randomIndex];
            randomArray[randomIndex] = temporaryValue;
        }
        if (randomArray.length > 0) {
            this.setState({
                randomIndexArray: randomArray,
                questionCount: 0,
                roundStart: true
            });
        }
    }

    checkAnswer(e) {
        let index = this.state.randomIndexArray[this.state.questionCount].index;

        e.preventDefault();
        let newData = this.props.collection;
        let form = new FormData(e.target);

        if (form.get('answer') === newData.content[index].word) {
            if (newData.content[index].familiarity < 100) {
                newData.content[index].familiarity = newData.content[index].familiarity + 20;
            }
            this.setState({ output: '答對了' });
        } else {
            if (newData.content[index].familiarity > 0) {
                newData.content[index].familiarity = newData.content[index].familiarity - 20;
            }
            this.setState({ output: '答錯了' });
        }

        let id = this.props.match.params.id;
        this.props.updateCollection(newData, id);
    }

    nextQuestion(e) {
        // 當array長度不足5時，修改題目顯示的數量
        let numberOfQuestion;
        if (this.state.randomIndexArray.length < 5) {
            numberOfQuestion = this.state.randomIndexArray.length - 1;
        } else {
            numberOfQuestion = 4
        }

        if (this.state.questionCount < numberOfQuestion) {
            this.setState(prevState => ({ questionCount: prevState.questionCount + 1, answer: '', output: '' }));
        } else {
            this.setState({ roundStart: false, answer: '', output: '' });
        }
    }

    restartTest(e) {
        let newData = this.props.collection;
        for (let i = 0; i < newData.content.length; i++) {
            newData.content[i].familiarity = 0;
        }

        this.setState({ doneTest: false });

        let id = this.props.match.params.id;
        this.props.updateCollection(newData, id);
    }

    componentWillReceiveProps(nextProps) {
        let arrayCheck = nextProps.collection.content.filter(item => item.familiarity === 0);
        if (arrayCheck.length === nextProps.collection.content.length) {
            this.setState({ allNewRound: true });
        }
        arrayCheck = nextProps.collection.content.filter(item => item.familiarity === 100);
        if (arrayCheck.length === nextProps.collection.content.length) {
            this.setState({ doneTest: true });
        }
    }

    render() {
        // 判斷現在要顯現的題目
        let index, definition;
        if (this.state.randomIndexArray !== '') {
            if (this.state.randomIndexArray[this.state.questionCount] !== undefined) {
                index = this.state.randomIndexArray[this.state.questionCount].index;
                definition = this.props.collection.content[index].definition;
            }
        }

        // 決定要不要顯示output欄位
        let ouputDiasplay = false;
        if (this.state.output !== '') {
            ouputDiasplay = true;
        }

        let outputColor;
        if (this.state.output === '答錯了') {
            outputColor = 'red';
        } else {
            outputColor = 'green';
        }

        return (
            <div className='content'>
                <Link className='back_to_collection' to={'/Collection/' + this.props.match.params.id}></Link>
                <div className='test_area'>
                    <div className='test_guide' style={{ display: this.state.allNewRound ? 'block' : 'none' }}>
                        <h1>測驗說明</h1>
                        <p>每次測驗將隨機出現1-5題</p>
                        <p>每答對一題熟悉程度<span style={{ color: 'green' }}>+20%</span></p>
                        <p>每答錯一題熟悉程度<span style={{ color: 'red' }}>-20%</span></p>
                        <button onClick={this.testStart}>開始測驗</button>
                    </div>

                    <div className='continue_test' style={{ display: this.state.allNewRound ? 'none' : 'block' }}>
                        <div style={{ display: this.state.roundStart ? 'none' : 'block' }}>
                            <h1>目前進度</h1>
                            {
                                this.props.collection && this.props.collection.content.map((card, index) => {
                                    return <p key={index} >{card.word} / {card.definition}：熟悉程度 {card.familiarity}%</p>
                                })
                            }
                            <button onClick={this.testStart} style={{ display: this.state.doneTest ? 'none' : 'block' }}>繼續測驗</button>

                            <p style={{ display: this.state.doneTest ? 'block' : 'none' }}>恭喜！已熟悉所有字卡</p>
                            <button onClick={this.restartTest} style={{ display: this.state.doneTest ? 'block' : 'none' }}>重置測驗</button>
                        </div>
                    </div>

                    <div className='test'>
                        <div style={{ display: this.state.roundStart ? 'block' : 'none' }} >
                            <div style={{ display: ouputDiasplay ? 'none' : 'block' }}>
                                <h1>{definition && definition}</h1>
                                <form onSubmit={this.checkAnswer}>
                                    <input name='answer' autocomplete="off" autofocus="true" value={this.state.answer} onChange={this.changeAnswer} />
                                </form>
                            </div>
                        </div>
                        <div style={{ display: ouputDiasplay ? 'block' : 'none' }}>
                            <h1 style={{ color: outputColor }}>{this.state.output}</h1>
                            <button onClick={this.nextQuestion}>點擊繼續</button>
                            <KeyboardEventHandler handleKeys={['alt+/']} onKeyEvent={this.nextQuestion} />
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

    let allNewRound = false;
    let doneTest = false;
    if (collection !== null) {
        let arrayCheck = collection.content.filter(item => item.familiarity === 0);
        if (arrayCheck.length === collection.content.length) {
            allNewRound = true;
        }
        arrayCheck = collection.content.filter(item => item.familiarity === 100);
        if (arrayCheck.length === collection.content.length) {
            doneTest = true;
        }
    }
    return {
        collection: collection,
        allNewRound: allNewRound,
        doneTest: doneTest
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
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
)(Test);