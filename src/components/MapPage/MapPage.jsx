import React from 'react';
import PropTypes from 'prop-types';
import css from './styles/MapPage.css';
import BlankLayout from 'components/BlankLayout';

export default function MapPage() {
    return (
        <BlankLayout>
            <div className={`text-center ${ css['google-maps'] }`}>
                <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7852.252962789969!2d123.85997270000001!3d10.251381699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1589437763995!5m2!1sen!2sph" 
                width="900" height="600" 
                frameBorder="0" style={{border:0}} allowFullScreen="" tabIndex="0" /> 
            </div> 
        </BlankLayout>        
    );
}
