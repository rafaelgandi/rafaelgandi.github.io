import React from 'react';
import PropTypes from 'prop-types';
import css from './styles/ContactPage.css';
import EmailLink from './EmailLink/EmailLink.jsx';
import constants from './lib/constants';
import contactLabels from './lib/contactLabels';

export default function ContactPage() { 
    return (
        <>
            <EmailLink />
            <div className={ css['contact-links'] }>
                {
                    contactLabels.map((contact) => (
                        <a 
                            href={ constants.uri[contact.href] } 
                            target="_blank" 
                            rel="noreferrer" 
                            title={contact.title} 
                            key={ contact.href }
                        >{ contact.label}</a>
                    ))
                }
            </div>
        </>
    );
}

