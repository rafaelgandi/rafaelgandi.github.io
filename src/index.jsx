import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import css from './index.css';
import { Container, Col, Row } from 'react-bootstrap';
import Header from './components/Header';
import PageSection from './components/PageSection';
import HomePage from './components/HomePage';
import simpleRouter from './lib/simpleRouter';
import { isInsideFrame, isMobile, typeOf } from './lib/helpers';
import constants from './lib/constants';
const WebDevPage = React.lazy(() => import('./components/WebDevPage'));
const ContactPage = React.lazy(() => import('./components/ContactPage'));

const App = () => {
    const [showHomePage, setShowHomePage] = useState(false);
    const [showContactPage, setShowContactPage] = useState(false);
    const [showWebDevPage, setShowWebDevPage] = useState(false);
    const currentPathName = window.location.pathname.trim();
    const currentUri = (parent !== window) ? document.referrer : document.location.href; // See: http://stackoverflow.com/a/7739035   
    
    function onNavigate(id, isExternal) {
        if (isExternal) {
            window.open(id);
            return;
        }
        window.scrollTo(0, 0);
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
        simpleRouter.navigate('/'); 
    }
    
    useEffect(() => {
        document.body.style.opacity = 1;
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
                    <Header 
                        onNavigate={ onNavigate } 
                        defaultActiveKey={ currentPathName }
                    />
                    <div id={ css['pages-wrapper'] }>
                        <PageSection id="raffy-page-home" show={ showHomePage }><HomePage /></PageSection>
                        <PageSection id="raffy-page-web-dev" show={ showWebDevPage } suspense><WebDevPage /></PageSection>
                        <PageSection id="raffy-page-contact" show={ showContactPage } suspense><ContactPage /></PageSection>  
                    </div>
                            
                </Col>
            </Row>
        </Container>
    );
};


ReactDOM.render(<App />, document.getElementById('placeholder-raffy-layout-component'));


