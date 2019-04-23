import React from 'react';

class MakingCard extends React.Component {
    constructor(props) {
        super(props);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.uploadImgHandler = this.uploadImgHandler.bind(this);
        this.deleteImgHandler = this.deleteImgHandler.bind(this);
        this.wordInputHandler = this.wordInputHandler.bind(this);
        this.defInputHandler = this.defInputHandler.bind(this);
    }

    wordInputHandler(e) {
        this.props.wordChange(this.props, e.target.value);
    }

    defInputHandler(e) {
        this.props.definitionChange(this.props, e.target.value);
    }

    uploadImgHandler(e) {
        this.props.uploadImg(this.props, e);
    }

    deleteImgHandler() {
        this.props.deleteImg(this.props);
    }

    deleteHandler() {
        this.props.deleteCard(this.props);
    }

    render() {
        let pictureStatue;
        if (this.props.pictureName === '') {
            pictureStatue = <label onChange={this.uploadImgHandler} className='add_image' title='增加圖片'> <input type='file' style={{ display: 'none' }} accept="image/*" /> </label>;
        } else if (this.props.pictureName === 'loading') {
            pictureStatue = <div className='loading_image'></div>;
        } else {
            pictureStatue = <div onClick={this.deleteImgHandler} className='delete_image' title='刪除圖片'></div>;
        }

        return (
            <div className='making_card ease'>
                <input placeholder='詞語' onChange={this.wordInputHandler} value={this.props.word} style={{ borderBottom: this.props.empty }} />
                <input placeholder='定義' onChange={this.defInputHandler} value={this.props.definition} style={{ borderBottom: this.props.empty }} />
                {pictureStatue}
                <div onClick={this.deleteHandler} className='delete_card' title='刪除字卡'></div>
            </div>
        )
    }
}

export default MakingCard;