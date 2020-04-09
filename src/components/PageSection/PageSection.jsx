import { Suspense } from 'react';
import PropTypes from 'prop-types';
import css from './styles/PageSection.css';
import { Spinner } from 'react-bootstrap';

const PageSpinner = () => {
    return (
        <div className="text-center mt-5">
            <Spinner animation="grow" className={ css['page-spinner'] } />
        </div>
    );
};

export default function PageSection(props) {
    return (
        <section id={ props.id } className={ `${css['page-sections']} ${ (props.show) ? css['show'] : ''}` }>
            { 
                (props.suspense) 
                ? <Suspense fallback={ <PageSpinner /> }>{ props.children }</Suspense> 
                : props.children
            }
        </section>
    );
}

PageSection.propTypes = {
    id: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    suspense: PropTypes.bool
};