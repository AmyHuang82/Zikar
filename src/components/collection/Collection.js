import React from 'react';
import { Link } from 'react-router-dom';

function Collection(props) {
    return (
        <Link to={'/Collection/' + props.id} className="collection">
            <h2>{props.title}</h2>
            <p className="words_number">詞語：{props.contentLength}個</p>
            <p>語言：{props.wordLan}／{props.defLan}</p>
            <p>作者：{props.author}</p>
            <p>{props.time}</p>
        </Link>
    );
}

export default Collection;