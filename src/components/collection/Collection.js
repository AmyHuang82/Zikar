import React from 'react';
import { Link } from 'react-router-dom';

function Collection(props) {

    let publicStatus;
    if (!props.public) {
        publicStatus = <div className='not_open'></div>;
    }

    return (
        <Link to={'/Collection/' + props.id} className="collection">
            <h2>{props.title}</h2>
            <p className="words_number">詞語：{props.contentLength} 個</p>
            <p>語言：{props.wordLan} / {props.defLan}</p>
            <p>作者：{props.author}</p>
            <p>{props.time}</p>
            {publicStatus}
        </Link>
    );
}

export default Collection;