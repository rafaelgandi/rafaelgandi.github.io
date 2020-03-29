import React from 'react';
import PropTypes from 'prop-types';
import css from './styles/Header.css';
import { Navbar, Nav } from 'react-bootstrap';

export default function Header(props) {
    
    const links = [
        { link: '/', linkLabel: 'Me' },
        { link: 'https://medium.com/rafael-gandionco', linkLabel: 'Blog', external: true },
        { link: 'http://tinyurl.com/RafaelGandioncoPhotography', linkLabel: 'Photography', external: true },
        { link: '/web-development', linkLabel: 'Web Development' },
        { link: '/contact', linkLabel: 'Contact' }
    ];
    
    function handleNavigateClick(e) {
        e.preventDefault();
        let id = e.currentTarget.rel,
            isExternal = !!parseInt(e.currentTarget.getAttribute('data-is-external'), 10);
        props.onNavigate(id, isExternal);
    }
    
    return (
        <Navbar collapseOnSelect expand="lg" bg="raffy-navbar" fixed="top">
            <Navbar.Brand href="#home" className={ css['profile-pic'] }>
                <picture>
                    <source type="image/webp" srcSet="images/profile3_comp.webp" />
                    <source type="image/jpeg" srcSet="images/profile3_comp_moz.jpg" />
                    <img src="images/profile3_comp.jpg" alt="rafael gadionco" />
                </picture>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={ css['responsive-navbar-nav'] } />
            <Navbar.Collapse id={ css['responsive-navbar-nav'] } className="justify-content-end">
                <Nav>
                    { 
                        links.map(({ link, linkLabel, external }) => (
                            <Nav.Item key={ link }>
                                <Nav.Link 
                                    rel={ link } 
                                    href={ link } 
                                    data-is-external={ !!external ? 1 : 0 }
                                    onClick={ handleNavigateClick 
                                }>{ linkLabel }</Nav.Link>
                            </Nav.Item>
                        )) 
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>        
    );
}

Header.propTypes = {
    onNavigate: PropTypes.func.isRequired
};