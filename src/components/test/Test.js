import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import { updateCollection } from '../../store/actions/collectionActions';
import TestInput from './TestInput';
import NextQ from './NextQ';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            output: '',
            allNewRound: props.allNewRound,
            randomIndexArray: '',
            questionCount: '',
            answer: '',
            roundStart: false,
            doneTest: props.doneTest
        }
        // 創建一個ref來儲存textInput的DOM元素
        this.textInput = React.createRef();
        this.focusTextInput = this.focusTextInput.bind(this);
        this.changeAnswer = this.changeAnswer.bind(this);
        this.testStart = this.testStart.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.restartTest = this.restartTest.bind(this);
    }

    focusTextInput() {
        this.textInput.current.focus();
    }

    changeAnswer(e) {
        this.setState({ answer: e.target.value });
    }

    testStart() {
        this.setState({ allNewRound: false });
        // 紀錄正確的index與目前文字的熟悉度
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
        // 將array順序打亂
        let temporaryValue, randomIndex;
        for (let i = 0; i < randomArray.length; i++) {
            randomIndex = Math.floor(Math.random() * randomArray.length);
            temporaryValue = randomArray[i];
            randomArray[i] = randomArray[randomIndex];
            randomArray[randomIndex] = temporaryValue;
        }
        // 判斷是否還有未考完的字
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

        if (form.get('answer').toUpperCase() === newData.content[index].word.toUpperCase()) {
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

    nextQuestion() {
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

    restartTest() {
        let newData = this.props.collection;
        for (let i = 0; i < newData.content.length; i++) {
            newData.content[i].familiarity = 0;
        }

        this.setState({ doneTest: false });

        let id = this.props.match.params.id;
        this.props.updateCollection(newData, id);
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            let arrayCheck = this.props.collection.content.filter(item => item.familiarity === 0);
            if (arrayCheck.length === this.props.collection.content.length) {
                this.setState({ allNewRound: true });
            }
            arrayCheck = this.props.collection.content.filter(item => item.familiarity === 100);
            if (arrayCheck.length === this.props.collection.content.length) {
                this.setState({ doneTest: true });
            }
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

        // 平均熟悉程度&判斷是不是自己的字卡
        let averageFamiliarity = 0;
        let notSelf = false;
        let user_uid = this.props.login.user_id;
        if (this.props.collection !== null) {
            for (let i = 0; i < this.props.collection.content.length; i++) {
                averageFamiliarity += this.props.collection.content[i].familiarity;
            }
            averageFamiliarity = Math.floor(averageFamiliarity / this.props.collection.content.length);

            if (this.props.collection.user_id !== user_uid) {
                notSelf = true;
            }
        }

        if (notSelf) return <Redirect to='/' />

        return (
            <div className='content'>
                <Link className='back_to_collection' to={'/Collection/' + this.props.match.params.id}></Link>
                <div className='test_area'>
                    <div className='test_guide' style={{ display: this.state.allNewRound ? 'block' : 'none' }}>
                        <h1>測驗說明</h1>
                        <p>每次測驗將隨機出現 1-5 題</p>
                        <p>每答對一題熟悉程度<span style={{ color: 'green' }}> +20%</span></p>
                        <p>每答錯一題熟悉程度<span style={{ color: 'red' }}>  -20%</span></p>
                        <button onClick={this.testStart}>開始測驗</button>
                    </div>

                    <div className='continue_test' style={{ display: this.state.allNewRound ? 'none' : 'block' }}>
                        <div style={{ display: this.state.roundStart ? 'none' : 'block' }}>
                            <h1>目前進度</h1>
                            <p className='familiarity_description'>熟悉程度平均</p>
                            <p className='average_percent'>{averageFamiliarity}%</p>
                            <button onClick={this.testStart} style={{ display: this.state.doneTest ? 'none' : 'block' }}>繼續測驗</button>

                            <p style={{ display: this.state.doneTest ? 'block' : 'none' }}>恭喜！已熟悉所有字卡</p>
                            <button onClick={this.restartTest} style={{ display: this.state.doneTest ? 'block' : 'none' }}>重置測驗</button>
                        </div>
                    </div>

                    <div className='test' style={{ display: this.state.roundStart ? 'block' : 'none' }}>
                        <TestInput
                            ouputDiasplay={ouputDiasplay}
                            count={this.state.questionCount}
                            definition={definition}
                            changeAnswer={this.changeAnswer}
                            answer={this.state.answer}
                            checkAnswer={this.checkAnswer}
                        />
                        <NextQ
                            ouputDiasplay={ouputDiasplay}
                            outputColor={outputColor}
                            output={this.state.output}
                            nextQuestion={this.nextQuestion}
                        />
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
        doneTest: doneTest,
        login: state.login.loginState
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