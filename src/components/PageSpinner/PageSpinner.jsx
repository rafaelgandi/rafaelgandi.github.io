
        import React from 'react';
        import PropTypes from 'prop-types';
        import css from './styles/PageSpinner.css';
        import { Spinner } from 'react-bootstrap';
        
        export default function PageSpinner() {
            return (
                <div className="text-center mt-5">
                    <Spinner animation="grow" className={ css['page-spinner'] } />
                </div>
            );
        }
        PageSpinner.propTypes = {};
    