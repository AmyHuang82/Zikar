import React from 'react';
import { connect } from 'react-redux';
import MakingCard from './MakingCard';

class MakingCollection extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='content'>
                <form className='collection_info'>
                    <input placeholder='字卡集標題' />
                    <div className='select-box'>
                        <select>
                            <option value='open'>公開</option>
                            <option value='close'>不公開</option>
                        </select>
                        <img className='arrow' src='../../image/arrow.svg' />
                    </div>
                </form>
                <div className='add-from-file'><span> + 從檔案匯入</span></div>
                <form className='card_info'>
                    <div className='select-box'>
                        <select>
                            <option value='english'>英文</option>
                            <option value='chinese'>中文</option>
                        </select>
                        <img className='arrow' src='../../image/arrow.svg' />
                    </div>
                    <div className='select-box'>
                        <select>
                            <option value='english'>英文</option>
                            <option value='chinese'>中文</option>
                        </select>
                        <img className='arrow' src='../../image/arrow.svg' />
                    </div>
                    <MakingCard />
                    <MakingCard />
                    <div className='add_card'><span> + 新增單詞卡</span></div>
                </form>
                <button>建立</button>
            </div>
        )
    }
}

export default MakingCollection;