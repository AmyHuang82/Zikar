import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

function CollectionDetail(props) {
    const id = props.match.params.id;
    return (
        <div className="content">
            <h1>我是{id}的detail</h1>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {

    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'collection' }
    ])
)(CollectionDetail);