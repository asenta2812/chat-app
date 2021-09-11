import React from 'react';
const Header = (props) => {
    const openMenu = () => {
        if (document.body.classList.contains('open-menu')) {
            document.body.classList.remove('open-menu');
        } else {
            document.body.classList.add('open-menu');
        }
    }
    return (
        <header className="fs-header">
           
        </header>

    )
}

export default Header
