import React from 'react';
import { connect } from 'react-redux';
import Collection from './collection/Collection';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='content'>
                <Collection />
                <Collection />
                <Collection />
                <Collection />
            </div>
        )
    }
}

export default Dashboard;