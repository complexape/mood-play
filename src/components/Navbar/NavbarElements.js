import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 20px;
`;

export const Logo = styled(Link)`
    margin-left: 20px;
    text-decoration: none;
    font-size: 30px;
    font-weight: 600;
    transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
    color: ${(props) => props.mood.textColor};
`;

export const RoutesContainer = styled.div`
    display: flex;
`;

export const RouteLink = styled(Link)`
    text-decoration: none;
    margin-left: 25px;
    transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
    text-decoration: ${(props) => props.isActive ? 'underline 2px' : 'none'};
    font-weight: 500;
    color: ${(props) => props.isActive ? props.mood.textColorAlt : props.mood.textColor};
`;