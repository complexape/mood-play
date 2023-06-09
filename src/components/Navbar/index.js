import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
    return (
        <Nav>
            <Bars />

            <NavMenu>
                <NavLink to='/' reloadDocument>
                    MoodPlay
                </NavLink>
                <NavLink to='/settings'>
                    Settings
                </NavLink>
            </NavMenu>
            <NavBtn>
                <NavBtnLink to='/sign-in'>Sign In</NavBtnLink>
            </NavBtn>
        </Nav>
    );
};

export default Navbar;