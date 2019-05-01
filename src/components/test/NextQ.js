import React from 'react';

class NextQ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            android: false
        }
        this.keyHandle = this.keyHandle.bind(this);
    }

    keyHandle(e) {
        if (e.keyCode === 32) {
            this.props.nextQuestion();
        }
    }

    componentDidMount() {
        let android = !!navigator.userAgent && /(android)/i.test(navigator.userAgent);
        if (android) {
            this.setState({ android: true });
        }
    }

    componentDidUpdate() {
        if (this.props.ouputDiasplay) {
            document.body.addEventListener('keyup', this.keyHandle);
        } else if (this.props.ouputDiasplay === false) {
            document.body.removeEventListener('keyup', this.keyHandle);
        }
    }

    componentWillUnmount() {
        document.body.removeEventListener('keyup', this.keyHandle);
    }

    render() {
        return (
            <div style={{ display: this.props.ouputDiasplay ? 'block' : 'none' }}>
                <h1 style={{ color: this.props.outputColor }}>{this.props.output}</h1>
                <button onClick={this.props.nextQuestion}>點擊<span style={{ display: this.state.android ? 'none' : 'inline' }}> / 空白鍵</span>繼續</button>
            </div>
        )
    }

}

export default NextQ;