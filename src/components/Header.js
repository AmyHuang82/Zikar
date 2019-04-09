import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchBarOpenToggle } from '../reducer/actions';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.openSearchBarToggle = this.openSearchBarToggle.bind(this);
    }

    openSearchBarToggle(e) {
        this.props.searchBarOpen_reducer();
    }

    render() {
        return (
            <header>
                <div className='container'>
                    <Link to='./' exact style={{ padding: 0 }}>
                        <img src={'../../image/Logo.svg'} className='logo' />
                    </Link>
                    <Link to='/MakingCards' exact className='add_card'>
                        <img className='add_card icon' src='../../image/add card.svg' />
                        <p>建立字卡</p>
                    </Link>
                    {this.props.children}
                    <form className='search_bar'>
                        <input className='search_input'></input>
                        <img className='search_btn icon' src='../../image/search.svg' />
                    </form>
                    <div className='search_bar_mobile'>
                        <img className='search_btn_top icon'
                            src='../../image/search_mobile.svg'
                            onClick={this.openSearchBarToggle}
                            style={{ display: this.props.searchBarOpen ? 'none' : 'block' }}
                        />
                        <img className='search_btn_top icon'
                            src='../../image/close.svg'
                            onClick={this.openSearchBarToggle}
                            style={{ display: this.props.searchBarOpen ? 'flex' : 'none' }}
                        />
                        <form className='search_bar_mobile_input'
                            style={{ display: this.props.searchBarOpen ? 'flex' : 'none' }}
                        >
                            <input className='search_input'></input>
                            <img className='search_btn_down icon' src='../../image/search.svg' />
                        </form>
                    </div>
                    <div className='member icon'
                        style={{ backgroundImage: this.props.loginState.login ? `url(${this.props.loginState.user_photo})` : `url('../../image/user.svg')` }}
                    ></div>
                </div>
            </header>
        );
    }
}

// 把reducer的state傳入component中
const mapStateToProps = (state) => {
    return {
        searchBarOpen: state.searchBarOpen_reducer.mobileSearchBarOpen,
        loginState: state.login_reducer.loginState
    }
}

// 把action的function傳入component中並使用dispatch去reducer處理
const mapDispatchToProps = (dispatch) => {
    return {
        searchBarOpen_reducer: () => {
            dispatch(searchBarOpenToggle());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);