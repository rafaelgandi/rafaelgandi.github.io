import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import css from './styles/Header.css';
import { Navbar, Nav } from 'react-bootstrap';

export default function Header(props) {
    
    const intialProfPicImgBase64Str = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wEEEAAsACwALAAsAC8ALAAyADcANwAyAEUASwBCAEsARQBmAF4AVgBWAF4AZgCbAG8AdwBvAHcAbwCbAOsAkwCsAJMAkwCsAJMA6wDQAPwAzQC/AM0A/ADQAXYBJgEEAQQBJgF2AbABawFXAWsBsAIMAdQB1AIMApMCcgKTA10DXQSGEQAsACwALAAsAC8ALAAyADcANwAyAEUASwBCAEsARQBmAF4AVgBWAF4AZgCbAG8AdwBvAHcAbwCbAOsAkwCsAJMAkwCsAJMA6wDQAPwAzQC/AM0A/ADQAXYBJgEEAQQBJgF2AbABawFXAWsBsAIMAdQB1AIMApMCcgKTA10DXQSG/8IAEQgAZABkAwEiAAIRAQMRAf/EABkAAAMBAQEAAAAAAAAAAAAAAAABAwIEBf/aAAgBAQAAAAD1ASWQYFUCWQYFBHDO3QwChk8rqV9gPZLEK46GDNkpONK6AKEpTxcVhlFx8CL38/u7ArDzE8w9E5fU0W4OHbI7780oW8uCqlDs6Xt285clc6zz+hfbt50pbY+fqvY//8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/9oACAECEAAAAABm0MXQZmxEm7IY1vMpN//EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/2gAIAQMQAAAAhKHXOBOzkHS84bXXFdx0xz1vJef/xAAqEAEAAgIABAQHAAMAAAAAAAABAAIDERASITEEIDAyIjNBQlFhcVKBwf/aAAgBAQABPwDzPqvp+J8U0tyU98sUt71szHy0Pc8r+X0Vm4418Ta30bQp+FIVERT+MpvXoWm5YC+t/uD0js7O2V7HoW4ZKjTf1JRe0aVuah39C0UOq6I56X3Ss3y2gy1ylWzDxOF+6bE2eVdTNn5egS7az1dwI3v/AJTBmX4bd5lq2xdOsRHSaZ4fJ9j5c1tEtbb/ALmuCR2TBZcVTmmfG3ruvcmNdjK25gfJ4i22W2SrsODLV6EwX5L8r2YMcdNtuUlNHQ4vQmV3eXTTMb8B/OF+0ToEyEw5eev7IM/ZxZk+ZM9imOY/bWbj1SMsbGVs477mO5aHF7Mt8yeK9tZT/kJ9TgTIG5UDBRlF0cf/xAAcEQEBAAICAwAAAAAAAAAAAAABABAgAjERITD/2gAIAQIBAT8A+Kxs+mNkW8bsMYYctxw9Rl6bjj//xAAfEQACAgEFAQEAAAAAAAAAAAAAAQIREAMgITFBMDL/2gAIAQMBAT8A+MUTW6LtE+dtEWki+Brcuxxsap4XaGqynZqeYj+kS7z6jUx//9k=`;    
    const [profPicData, setProfPicData] = useState({
        webp: intialProfPicImgBase64Str,
        moz: intialProfPicImgBase64Str,
        fallback: intialProfPicImgBase64Str,
        initialProfPicClass: css['initial-profile-pic'] 
    });
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
    
    function updateProfPicImage() {
            const i = new Image();
            i.src = 'images/profile3_comp.webp';
            i.onload = () => {
                setProfPicData({
                    webp: 'images/profile3_comp.webp',
                    moz: 'images/profile3_comp_moz.jpg',
                    fallback: 'images/profile3_comp.jpg',
                    initialProfPicClass: ''
                });
            };
    }
    
    useEffect(() => {
        updateProfPicImage();
    }, []);
    
    return (
        <Navbar 
            collapseOnSelect 
            expand="lg" 
            bg="raffy-navbar" 
            fixed="top" 
        >
            <Navbar.Brand href={ links[0].link } className={ css['profile-pic'] }>
                <picture className={ profPicData.initialProfPicClass } title="Hi!">
                    <source type="image/webp" srcSet={ profPicData.webp } />
                    <source type="image/jpeg" srcSet={ profPicData.moz } />
                    <img src={ profPicData.fallback } alt="rafael gadionco" />
                </picture>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={ css['responsive-navbar-nav'] } />
            <Navbar.Collapse id={ css['responsive-navbar-nav'] } className="justify-content-end">
                <Nav defaultActiveKey={ (!!props.defaultActiveKey) ? props.defaultActiveKey : '/' }>
                    { 
                        links.map(({ link, linkLabel, external }) => (
                            <Nav.Item key={ link }>
                                <Nav.Link 
                                    rel={ link } 
                                    href={ link } 
                                    data-is-external={ !!external ? 1 : 0 }
                                    onClick={ handleNavigateClick} 
                                    eventKey={ link } 
                                >{ linkLabel }</Nav.Link>
                            </Nav.Item>
                        )) 
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>        
    );
}

Header.propTypes = {
    onNavigate: PropTypes.func.isRequired,
    defaultActiveKey: PropTypes.string
};