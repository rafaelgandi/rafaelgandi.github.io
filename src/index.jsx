import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
import css from './index.css';
import { Container, Col, Row } from 'react-bootstrap';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import constants from 'lib/constants';
import PageNotFound from 'components/PageNotFound';
import PageSpinner from 'components/PageSpinner';
import HomePage from 'components/HomePage';
import { isInsideFrame, isMobile } from 'lib/helpers';
const WebDevPage = React.lazy(() => import('components/WebDevPage'));
const ContactPage = React.lazy(() => import('components/ContactPage'));
const MapPage = React.lazy(() => import('components/MapPage')); 

const App = () => { 
    useEffect(() => {
        document.body.style.opacity = 1;
        // Breakout of frame if in mobile and in frameset (.tk) //   
        if (isInsideFrame() && isMobile()) {
            window.top.location.href = constants.uri.myGithubPageUri;
            return;
        } 
    }, []);
    return (
        <Suspense fallback={<PageSpinner />}>
            <Container id="raffy-wrapper">
                <BrowserRouter>
                    <Switch>
                        <Route path={ constants.routes.home } component={ HomePage } exact />
                        <Route path={ constants.routes.webDevelopment } component={ WebDevPage } exact />                
                        <Route path={ constants.routes.contact } component={ ContactPage } exact />                
                        <Route path={ constants.routes.map } component={ MapPage } exact />                
                        <Route component={ PageNotFound } />
                    </Switch>
                </BrowserRouter>
            </Container>
        </Suspense>
    );
};
ReactDOM.render(<App />, document.getElementById('root'));


