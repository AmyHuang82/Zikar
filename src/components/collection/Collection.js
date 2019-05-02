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
            <p className="words_number">語言：{props.wordLan} / {props.defLan}</p>
            <p className="words_number">詞語：{props.contentLength} 個</p>
            <div className="creator_grid">
                <p>{props.author}</p>
                <img src={props.user_photo} />
            </div>
            {publicStatus}
        </Link>
    );
}

export default Collection;