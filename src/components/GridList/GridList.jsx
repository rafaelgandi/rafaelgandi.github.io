import React from 'react';
import PropTypes from 'prop-types';
import css from './styles/GridList.css';
import LazyImg from './components/LazyImg';    

export default function GridList(props) {
    return (
        <div className={ css['grid-container'] }>
            {                
                props.listData.map(({ image, link, header, desc}) => (
                    <div className={ css['grid-item'] } key={ image + link} >
                        <a href={ link } title={ header } target="_blank">
                            <LazyImg 
                                src={ image } 
                                alt={ header } 
                                additionalContainerClass={css['img-con']} 
                            />                       
                            <div className={ css['desc'] }>{ (!!desc) ? desc : header }</div>
                        </a>
                    </div>
                ))
            }
        </div>
    );
}

GridList.propTypes = {
    listData: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.string,
        link: PropTypes.string,
        header: PropTypes.string,
        desc: PropTypes.string
    })).isRequired
};