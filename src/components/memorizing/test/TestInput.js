import React from 'react';

class TestInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.count !== this.props.count) {
      this.focusTextInput();
    }
  }

  render() {
    return (
      <div style={{ display: this.props.ouputDiasplay ? 'none' : 'block' }}>
        <h1>{this.props.definition && this.props.definition}</h1>
        <form onSubmit={this.props.checkAnswer}>
          <input name='answer' autoComplete='off' ref={this.textInput} value={this.props.answer} onChange={this.props.changeAnswer} />
        </form>
        <p style={{ color: 'silver' }}>（按 Enter 送出答案）</p>
      </div>
    )
  }

}

export default TestInput;