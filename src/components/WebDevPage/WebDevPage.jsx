import React from 'react';
import PropTypes from 'prop-types';
import css from './styles/WebDevPage.css';
import GridList from './components/GridList';
import openSourceProjects from './lib/openSourceProjects';
import projects from './lib/projects';
import weapons from './lib/weapons';

export default function WebDevPage() {
    return (
        <>
            <h1 className={ css['web-dev-h1'] }>Tools I use</h1>
            <GridList listData={ weapons } />
            <hr />
            
            <h1 className={ css['web-dev-h1'] } style={{ marginTop: '80px' }}>Open source projects</h1>
            <GridList listData={ openSourceProjects } />
            <hr />
            
            <h1 className={ css['web-dev-h1'] } style={{ marginTop: '80px' }}>Client projects</h1>
            <GridList listData={ projects } />
        </>
    );
}

