import React, { Suspense, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import css from './index.css';
import { Container, Col, Row } from 'react-bootstrap';
import Header from './components/Header';
import PageSection from './components/PageSection';
import HomePage from './components/HomePage';
import ContactPage from './components/ContactPage';
import WebDevPage from './components/WebDevPage';
import simpleRouter from './lib/simpleRouter';
import { isInsideFrame, isMobile, typeOf } from './lib/helpers';
import constants from './lib/constants';

const App = () => {
    const [showHomePage, setShowHomePage] = useState(false);
    const [showContactPage, setShowContactPage] = useState(false);
    const [showWebDevPage, setShowWebDevPage] = useState(false);
    const currentUri = (parent !== window) ? document.referrer : document.location; // See: http://stackoverflow.com/a/7739035   
    
    function onNavigate(id, isExternal) {
        if (isExternal) {
            window.open(id);
            return;
        }
        simpleRouter.navigate(id); 
    } 
    
    function setInitialPage() {
        if (typeOf(currentUri) === 'string') {
            if (currentUri.indexOf(constants.routes.webDevelopment) !== -1) {
                simpleRouter.navigate(constants.routes.webDevelopment); 
                return;
            }
            else if (currentUri.indexOf(constants.routes.contact) !== -1) {
                simpleRouter.navigate(constants.routes.contact); 
                return;
            }
            else {
                simpleRouter.navigate('/'); 
                return;
            }
        }        
        
        console.log(window.location.pathname);
        
        //simpleRouter.navigate(window.location.pathname); 
        simpleRouter.navigate('/'); 
    }
    
    useEffect(() => {
        // Breakout of frame if in mobile and in frameset (.tk) //   
        if (isInsideFrame() && isMobile()) {
            window.top.location.href = constants.uri.myGithubPageUri;
            return;
        } 
        simpleRouter
        .route(constants.routes.home, () => {
            setShowContactPage(false);
            setShowWebDevPage(false);
            setShowHomePage(true);            
        })
        .route(constants.routes.webDevelopment, () => {
            setShowHomePage(false);
            setShowContactPage(false);
            setShowWebDevPage(true);            
        })
        .route(constants.routes.contact, () => {
            setShowHomePage(false);
            setShowWebDevPage(false);
            setShowContactPage(true);
        });
        setInitialPage();
    }, []);
    
    return (
        <Container id="raffy-wrapper">
            <Row>
                <Col>
                    <Header onNavigate={ onNavigate } />
                    <div id={ css['pages-wrapper'] }>
                        <PageSection id="raffy-page-home" show={ showHomePage }><HomePage /></PageSection>
                        <PageSection id="raffy-page-web-dev" show={ showWebDevPage }><WebDevPage /></PageSection>
                        <PageSection id="raffy-page-contact" show={ showContactPage }><ContactPage /></PageSection>  
                    </div>
                            
                </Col>
            </Row>
        </Container>
    );
};


ReactDOM.render(<App />, document.getElementById('placeholder-raffy-layout-component'));


