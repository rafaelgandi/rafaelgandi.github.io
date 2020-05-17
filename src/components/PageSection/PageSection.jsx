import React from 'react';
import PropTypes from 'prop-types';
import css from './styles/PageSection.css';

export default function PageSection(props) {
    return (
        <section id={ props.id } className={ `${css['page-sections']}` }>
            { props.children }
        </section>
    );
}

PageSection.propTypes = {
    id: PropTypes.string.isRequired
};