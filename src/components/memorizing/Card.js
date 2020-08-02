import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: props.word,
      showing_lan: props.word_lan,
      open: '',
      pic_showing: false,
      speakBackground: '0',
    };
    this.flipCard = this.flipCard.bind(this);
    this.speak = this.speak.bind(this);
    this.keyHandle = this.keyHandle.bind(this);
  }

  flipCard() {
    if (this.state.showing === this.props.word) {
      this.setState({
        showing: this.props.definition,
        showing_lan: this.props.definition_lan,
      });
      if (this.props.picture !== '') {
        this.setState({ pic_showing: true });
      }
    } else {
      this.setState({
        showing: this.props.word,
        showing_lan: this.props.word_lan,
        pic_showing: false,
      });
    }
    this.setState({ open: 'open' });
    setTimeout(() => {
      this.setState({ open: '' });
      this.speak();
    }, 500);
  }

  speak() {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      // 正在講話不重複執行
      return;
    } else {
      this.setState({ speakBackground: '-35px' });
      const speakText = new SpeechSynthesisUtterance(this.state.showing);
      speakText.lang = this.state.showing_lan;
      synth.speak(speakText);
      speakText.onend = () => {
        this.setState({ speakBackground: '0' });
      };
    }
  }

  keyHandle(e) {
    if (e.key === 'ArrowUp') {
      this.flipCard();
    } else if (e.key === 'ArrowDown') {
      this.speak();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.word !== prevProps.word) {
      this.setState({
        showing: this.props.word,
        showing_lan: this.props.word_lan,
        pic_showing: '',
      });
    }
    if (this.state.showing !== prevState.showing) {
      this.speak();
    }
  }

  componentDidMount() {
    this.speak();
    document.body.addEventListener('keyup', this.keyHandle);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keyup', this.keyHandle);
  }

  render() {
    let color;
    if (this.props.familiarity === 0) {
      color = 'silver';
    } else if (this.props.familiarity < 60) {
      color = 'rgb(252, 150, 150)';
    } else {
      color = 'rgb(143, 204, 143)';
    }

    return (
      <div
        className={`show_card ${this.state.open} ${this.props.nextAnimation}`}
      >
        <div className="card_flip_area" onClick={this.flipCard}>
          <div
            style={{ display: this.state.pic_showing ? 'block' : 'none' }}
            className="img_wrap"
          >
            <img src={this.props.picture} />
          </div>
          <p className="text-align-center">{this.state.showing}</p>
          <div className="paging">
            {this.props.currentIndex + 1}/{this.props.length}
          </div>
          <div
            className="show_card_hover"
            style={{
              color: color,
              display: this.props.notSelf ? 'none' : 'block',
            }}
          >
            <span>熟悉程度：</span>
            {this.props.familiarity}%
          </div>
        </div>
        <div className="card_feature">
          <div
            onClick={this.speak}
            className="speak"
            style={{ backgroundPositionX: this.state.speakBackground }}
          ></div>
        </div>
      </div>
    );
  }
}

export default Card;
