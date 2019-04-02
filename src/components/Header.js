import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className='container'>
                    <img className='logo' src='../../image/Logo.svg' />
                    <a className='add_card'>
                        <img className='add_card icon' src='../../image/add card.svg' />
                        <p>建立字卡</p>
                    </a>
                    <div className='search_bar'>
                        <input className='search_input'></input>
                        <img className='search_btn icon' src='../../image/search.svg' />
                    </div>
                    <div className='search_bar_mobile'>
                        <img className='search_btn_top icon' src='../../image/search_mobile.svg' />
                        <div className='search_bar_mobile_input'>
                            <input className='search_input'></input>
                            <img className='search_btn_down icon' src='../../image/search.svg' />
                        </div>
                    </div>
                    <img className='member icon' src='../../image/user.svg' />
                </div>
            </header>
        );
    }
}

export default Header;