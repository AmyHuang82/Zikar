import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import GameCard from './GameCard';

class MatchGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsArray: '',
      count: 0,
      roundOver: '',
      roundOverTime: '',
      gameTime: '',
    };
    this.gameStart = this.gameStart.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pickCard = this.pickCard.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.nonActiveBorder = this.nonActiveBorder.bind(this);
    this.checkRoundOver = this.checkRoundOver.bind(this);
  }

  gameStart(content) {
    let collection = content.slice();
    let passArray = [];
    if (collection !== null) {
      let randomArray = [];
      // 判斷如果字少於4個就每個字再複製一份
      if (collection.length < 4) {
        for (let i = 0; i < collection.length; i++) {
          for (let j = 0; j < 2; j++) {
            randomArray.push(collection[i]);
          }
        }
      } else {
        randomArray = collection;
      }
      // 打亂陣列
      let temporaryValue, randomIndex;
      for (let i = 0; i < randomArray.length; i++) {
        randomIndex = Math.floor(Math.random() * randomArray.length);
        temporaryValue = randomArray[i];
        randomArray[i] = randomArray[randomIndex];
        randomArray[randomIndex] = temporaryValue;
      }
      // 只取前4個數
      randomArray.splice(4, randomArray.length - 4);
      // 複製一份一樣的
      for (let i = 0; i < randomArray.length; i++) {
        for (let j = 0; j < 2; j++) {
          passArray.push(randomArray[i]);
        }
      }
      // 全部多存一個show的key並且4個是word、4個是definition
      for (let i = 0; i < 8; i++) {
        if (i % 2 === 0) {
          passArray[i] = { ...passArray[i], show: passArray[i].word };
        } else {
          passArray[i] = { ...passArray[i], show: passArray[i].definition };
        }
      }
      // 再次打亂順序
      for (let i = 0; i < passArray.length; i++) {
        randomIndex = Math.floor(Math.random() * passArray.length);
        temporaryValue = passArray[i];
        passArray[i] = passArray[randomIndex];
        passArray[randomIndex] = temporaryValue;
      }
      // 將新的順序資料存入資料裡
      for (let i = 0; i < 8; i++) {
        passArray[i] = { ...passArray[i], label: i };
      }
    }
    this.setState({
      cardsArray: passArray,
      roundOver: false,
      gameTime: '00:00',
    });
    this.startTimer(0, 1);
  }

  startTimer(minute, second) {
    let timer;

    let intervalTimer = setInterval(() => {
      if (minute < 10 && second < 10) {
        timer = `0${minute}:0${second}`;
      } else if (minute < 10) {
        timer = `0${minute}:${second}`;
      } else if (second < 10) {
        timer = `${minute}:0${second}`;
      }

      second++;
      if (second === 60) {
        minute++;
        second = 0;
      }

      this.setState({ gameTime: timer });
      if (this.state.roundOver) {
        clearInterval(intervalTimer);
      }
    }, 1000);
  }

  pickCard(card) {
    let cardsArray = this.state.cardsArray.slice();
    let count = this.state.count;

    if (cardsArray[card.label].border === undefined) {
      if (this.state.count < 2) {
        cardsArray[card.label] = {
          ...cardsArray[card.label],
          border: 'active',
        };
        this.setState({ cardsArray: cardsArray });
        this.setState((prevState) => ({ count: prevState.count + 1 }));
        count++;
      }
    }

    if (count === 2) {
      this.checkAnswer(cardsArray);
    }
  }

  checkAnswer(cardsArray) {
    let checkArray = cardsArray.filter((item) => item.border !== undefined);
    checkArray = checkArray.filter((item) => item.border !== 'correct');
    if (checkArray[0].word === checkArray[1].word) {
      cardsArray[checkArray[0].label].border = 'correct';
      cardsArray[checkArray[1].label].border = 'correct';
      this.setState({ count: 0 });
      setTimeout(() => {
        this.checkRoundOver();
      }, 800);
    } else {
      cardsArray[checkArray[0].label].border = 'wrong';
      cardsArray[checkArray[1].label].border = 'wrong';
      setTimeout(() => {
        this.nonActiveBorder();
      }, 1000);
    }
  }

  nonActiveBorder() {
    let cardsArray = this.state.cardsArray.slice();
    let newArray = cardsArray.filter((item) => item.border === 'wrong');
    delete cardsArray[newArray[0].label].border;
    delete cardsArray[newArray[1].label].border;
    this.setState({ cardsArray: cardsArray, count: 0 });
  }

  checkRoundOver() {
    let checkArray = this.state.cardsArray.filter(
      (item) => item.border === 'correct'
    );
    if (checkArray.length === 8) {
      this.setState({ roundOver: true, roundOverTime: this.state.gameTime });
    }
  }

  componentDidMount() {
    if (this.props.collection !== null) {
      this.gameStart(this.props.collection);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.collection !== prevProps.collection) {
      this.gameStart(this.props.collection);
    }
  }

  render() {
    if (!this.props.login.login) return <Redirect to="/" />;
    return (
      <div className="content game_area">
        <Link
          className="back_to_collection"
          to={'/Collection/' + this.props.match.params.id}
        ></Link>
        <h2
          className="game_time"
          style={{ display: this.state.roundOver ? 'none' : 'block' }}
        >
          {this.state.gameTime}
        </h2>
        {this.state.cardsArray &&
          this.state.cardsArray.map((card, index) => {
            return (
              <GameCard
                key={index}
                label={card.label}
                show={card.show}
                word={card.word}
                pickCard={this.pickCard}
                border={card.border}
              />
            );
          })}
        <div
          className="popup-overlay"
          style={{ display: this.state.roundOver ? 'flex' : 'none' }}
        >
          <div className="deletecheck-popup">
            你花了{this.state.roundOverTime}完成遊戲！
            <button
              className="cancel"
              onClick={this.gameStart.bind(this, this.props.collection)}
            >
              再玩一次
            </button>
            <Link
              className="cancel"
              to={'/Collection/' + this.props.match.params.id}
            >
              繼續背誦
            </Link>
            <div className="deletecheck-popup-background"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const collections = state.firestore.data.collection;
  const collection = collections ? collections[id].content : null;
  return {
    collection: collection,
    login: state.login.loginState,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'collection' }])
)(MatchGame);
