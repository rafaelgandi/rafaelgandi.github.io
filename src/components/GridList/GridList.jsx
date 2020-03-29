import React from 'react';
import PropTypes from 'prop-types';
import css from './styles/GridList.css';

export default function GridList(props) {
    return (
        <div className={ css['grid-container'] }>
            {                
                props.listData.map(({ image, link, header, desc}) => (
                    <div className={ css['grid-item'] } key={ image + link} >
                        <a href={ link } title={ header } target="_blank">
                            <div className={ css['img-con'] }>
                                <img src={ image } alt={ header } />
                            </div>                          
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