import React from 'react';
import PropTypes from 'prop-types';
import css from './styles/PageNotFound.css';
import Layout from 'components/Layout';
import PageSection from 'components/PageSection';

export default function PageNotFound(props) {
    return (
        <Layout>
            <PageSection id="raffy-page-404">
                <h1 className="text-center">Page Not Found</h1>
            </PageSection>
        </Layout>
    );
}
PageNotFound.propTypes = {};
