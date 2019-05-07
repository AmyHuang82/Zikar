import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchBarOpenToggle } from '../store/actions/searchBarActions';
import { logout } from '../store/actions/loginActions';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logoutBlock: false,
            logoutState: false,
            keyword: '',
            loginRequest: false
        }
        this.openSearchBarToggle = this.openSearchBarToggle.bind(this);
        this.logoutBlockToggle = this.logoutBlockToggle.bind(this);
        this.logout = this.logout.bind(this);
        this.searchKeyword = this.searchKeyword.bind(this);
        this.startSearch = this.startSearch.bind(this);
        this.loginRequestPopup = this.loginRequestPopup.bind(this);
    }

    openSearchBarToggle() {
        this.props.searchBarOpen();
    }

    logoutBlockToggle() {
        this.setState({ logoutBlock: !this.state.logoutBlock });
    }

    logout() {
        this.setState({ logoutState: true });
        this.props.logout();
    }

    searchKeyword(e) {
        this.setState({ keyword: e.target.value });
    }

    startSearch(e) {
        e.preventDefault();
        if (this.state.keyword.trim() !== '') {
            window.location.hash = '/Search/' + this.state.keyword.trim();
            this.setState({ keyword: '' });
            this.openSearchBarToggle();
        } else {
            this.setState({ keyword: '' });
        }
    }

    loginRequestPopup(e) {
        if (e.target.textContent === '取消') {
            this.setState({ loginRequest: false });
        } else {
            this.setState({ loginRequest: true });
        }
    }

    render() {
        if (this.state.logoutState) return <Redirect to='/' />;

        let logOutWord;
        let addNewCollectionShow;
        if (this.props.loginState.user_id === 'anonymous') {
            logOutWord = '登 入';
            addNewCollectionShow =
                <div onClick={this.loginRequestPopup} className='add_card'>
                    <img className='add_card icon' src='../../image/add card.svg' />
                    <p>建立字卡</p>
                </div>;
        } else {
            logOutWord = '登 出';
            addNewCollectionShow =
                <Link to='/MakingCards/new' exact className='add_card'>
                    <img className='add_card icon' src='../../image/add card.svg' />
                    <p>建立字卡</p>
                </Link>;
        }

        return (
            <header>
                <div className='popup-overlay' style={{ display: this.state.loginRequest ? 'flex' : 'none' }}>
                    <div className='deletecheck-popup'>
                        <p style={{ zIndex: 5 }}>立即登入 / 註冊建立字卡<br />體驗完整功能！</p>
                        <button className='cancel' onClick={this.loginRequestPopup}>取消</button>
                        <button className='confirm' onClick={this.logout}>登入</button>
                        <div className='deletecheck-popup-background'></div>
                    </div>
                </div>

                <div className='container'>
                    <Link to='/' exact style={{ padding: 0 }}>
                        <img src={'../../image/Logo.svg'} className='logo' />
                    </Link>
                    {addNewCollectionShow}
                    {this.props.children}
                    <form className='search_bar' onSubmit={this.startSearch}>
                        <input className='search_input' onChange={this.searchKeyword} value={this.state.keyword} placeholder='搜尋全站字卡集' />
                        <img className='search_btn icon' src='../../image/search.svg' onClick={this.startSearch} />
                    </form>
                    <div className='search_bar_mobile'>
                        <img className='search_btn_top icon'
                            src='../../image/search_mobile.svg'
                            onClick={this.openSearchBarToggle}
                            style={{ display: this.props.searchBarToggle ? 'none' : 'block' }}
                        />
                        <img className='search_btn_top icon'
                            src='../../image/close.svg'
                            onClick={this.openSearchBarToggle}
                            style={{ display: this.props.searchBarToggle ? 'flex' : 'none' }}
                        />
                        <form className='search_bar_mobile_input'
                            style={{ display: this.props.searchBarToggle ? 'flex' : 'none' }}
                            onSubmit={this.startSearch}
                        >
                            <input className='search_input' onChange={this.searchKeyword} value={this.state.keyword} placeholder='搜尋全站字卡集' />
                            <img className='search_btn_down icon' src='../../image/search.svg' onClick={this.startSearch} />
                        </form>
                    </div>
                    <div className='log_out' style={{ display: this.state.logoutBlock ? 'block' : 'none' }} onClick={this.logout}>{logOutWord}</div>
                    <div className='member icon'
                        style={{ backgroundImage: this.props.loginState.login ? `url(${this.props.loginState.user_photo})` : `url('../../image/user.svg')` }}
                        onClick={this.logoutBlockToggle}
                    ></div>
                </div>
            </header>
        );
    }
}

// 把reducer的state傳入component中
const mapStateToProps = (state) => {
    return {
        searchBarToggle: state.mobileSearchBar.mobileSearchBarOpen,
        loginState: state.login.loginState
    }
}

// 把action的function傳入component中並使用dispatch去reducer處理
const mapDispatchToProps = (dispatch) => {
    return {
        searchBarOpen: () => {
            dispatch(searchBarOpenToggle());
        },
        logout: () => {
            dispatch(logout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);