import React from 'react';
import PropTypes from 'prop-types';
import css from './styles/HomePage.css';

export default function HomePage() {
    return (
        <p id={ css['bigger-text'] } style={ {marginTop: '2.6em'} } className="text-center">
            Hi, my name's Rafael Gandionco and I'm a minimalist, web developer, and photographer from the Philippines.
        </p> 
    );
}
