import React from 'react';
import { Link } from 'react-router-dom';

function Collection(props) {
    return (
        <Link to='/Collection/2' className="collection">
            <h2>Collection Title</h2>
            <p className="words_number">詞語：10個</p>
            <p>語言：英文／中文</p>
            <p>作者：Amy Huang</p>
            <p>2019/4/9 14:41</p>
        </Link>
    );
}

export default Collection;