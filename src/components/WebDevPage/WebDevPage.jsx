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
            <h1>Tools I use</h1>
            <GridList listData={ weapons } />
            
            <h1 style={{ marginTop: '80px' }}>Open source projects</h1>
            <GridList listData={ openSourceProjects } />
            
            <h1 style={{ marginTop: '80px' }}>Client projects</h1>
            <GridList listData={ projects } />
        </>
    );
}

