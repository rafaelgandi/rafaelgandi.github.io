import React from 'react';
import PropTypes from 'prop-types';
import css from './styles/ContactPage.css';
import EmailLink from './EmailLink/EmailLink.jsx';
import constants from './lib/constants';

export default function ContactPage() { 
    return (
        <>
            <EmailLink />
            <div className={ css['contact-links'] }>
                <a href={ constants.uri.instagram } target="_blank" rel="noreferrer" title="Go to my instagram page">Instagram</a>
                <a href={ constants.uri.facebook } target="_blank" rel="noreferrer" title="Add me on facebook">Facebook</a>
                <a href={ constants.uri.linkedin } target="_blank" rel="noreferrer" title="View my linkedin profile">LinkedIn</a>
                <a href={ constants.uri.zerothreetwo } target="_blank" rel="noreferrer" title="Read a photo essay I did for Zerothreetwo.com">032</a>
                <a href={ constants.uri.medium } target="_blank" rel="noreferrer" title="Check out my blog a medium">Medium</a>
                <a href={ constants.uri.flickr } target="_blank" rel="noreferrer" title="View my flickr profile">Flickr</a>
                <a href={ constants.uri.fiveHundredPx } target="_blank" rel="noreferrer" title="View my 500px profile">500px</a>
                <a href={ constants.uri.eyeem } target="_blank" rel="noreferrer" title="View my EyeEm profile">EyeEm</a>
                <a href={ constants.uri.github } target="_blank" rel="noreferrer" title="Checkout my open source projects at github.com">Github</a>
            </div>
        </>
    );
}

