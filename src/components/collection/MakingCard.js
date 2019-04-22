import React from 'react';

class MakingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hadPicture: ''
        }
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

    componentDidMount() {
        let picture;
        if (this.props.pictureName !== '') {
            picture = true;
        } else {
            picture = false;
        }
        this.setState({ hadPicture: picture });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.pictureName !== this.props.pictureName) {
            let picture;
            if (this.props.pictureName !== '') {
                picture = true;
            } else {
                picture = false;
            }
            this.setState({ hadPicture: picture });
        }
    }

    render() {
        return (
            <div className='making_card ease'>
                <input placeholder='詞語' onChange={this.wordInputHandler} value={this.props.word} style={{ borderBottom: this.props.empty }} />
                <input placeholder='定義' onChange={this.defInputHandler} value={this.props.definition} style={{ borderBottom: this.props.empty }} />
                <label onChange={this.uploadImgHandler} className='add_image' style={{ display: this.state.hadPicture ? 'none' : 'block' }} title='增加圖片'>
                    <input type='file' style={{ display: 'none' }} accept="image/*" />
                </label>
                <div onClick={this.deleteImgHandler} className='delete_image' title='刪除圖片' style={{ display: this.state.hadPicture ? 'block' : 'none' }}></div>
                <div onClick={this.deleteHandler} className='delete_card' title='刪除字卡'></div>
            </div>
        )
    }
}

export default MakingCard;