import React from 'react';

class MakingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewPicToggle: false
        }
        this.textInput = React.createRef();
        this.focusTextInput = this.focusTextInput.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.uploadImgHandler = this.uploadImgHandler.bind(this);
        this.deleteImgHandler = this.deleteImgHandler.bind(this);
        this.wordInputHandler = this.wordInputHandler.bind(this);
        this.defInputHandler = this.defInputHandler.bind(this);
        this.previewPic = this.previewPic.bind(this);
    }

    focusTextInput() {
        this.textInput.current.focus();
    }

    wordInputHandler(e) {
        this.props.wordChange(this.props, e.target.value);
    }

    defInputHandler(e) {
        this.props.definitionChange(this.props, e.target.value);
    }

    uploadImgHandler(e) {
        this.props.compressImg(this.props, e);
    }

    deleteImgHandler() {
        this.props.deleteImg(this.props);
        this.setState({ previewPicToggle: false });
    }

    deleteHandler() {
        this.props.deleteCard(this.props);
    }

    previewPic(e) {
        if (e.target.textContent === '取消') {
            this.setState({ previewPicToggle: false });
        } else {
            this.setState({ previewPicToggle: true });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.empty !== this.props.empty) {
            this.focusTextInput();
        }
    }

    render() {
        let pictureStatue;
        if (this.props.pictureName === '') {
            pictureStatue = <label onChange={this.uploadImgHandler} className='add_image' title='增加圖片'> <input type='file' style={{ display: 'none' }} accept='image/*' /> </label>;
        } else if (this.props.pictureName === 'loading') {
            pictureStatue = <div className='loading_image'></div>;
        } else {
            pictureStatue = <div onClick={this.previewPic} className='preview_image' style={{ backgroundImage: `url(${this.props.pictureURL})` }} title='預覽圖片'></div>;
        }

        return (
            <div className='making_card ease'>
                <div className='popup-overlay' style={{ display: this.state.previewPicToggle ? 'flex' : 'none' }}>
                    <div className='deletecheck-popup' style={{ height: '330px' }}>
                        <p>圖片預覽</p>
                        <div style={{ zIndex: 5, border: '1px dashed silver', width: '80%', paddingBottom: '80%' }} className='img_wrap'>
                            <img src={this.props.pictureURL} />
                        </div>
                        <button className='cancel' onClick={this.previewPic}>取消</button>
                        <button className='confirm' onClick={this.deleteImgHandler}>刪除</button>
                        <div className='deletecheck-popup-background'></div>
                    </div>
                </div>
                <input placeholder='詞語' ref={this.textInput} onChange={this.wordInputHandler} value={this.props.word} style={{ borderBottom: this.props.empty }} />
                <input placeholder='定義' onChange={this.defInputHandler} value={this.props.definition} style={{ borderBottom: this.props.empty }} />
                {pictureStatue}
                <div onClick={this.deleteHandler} className='delete_card' title='刪除字卡'></div>
            </div>
        )
    }
}

export default MakingCard;