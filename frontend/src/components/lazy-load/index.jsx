import React from 'react'
import Lazyload from 'react-lazyload'

import PropTypes from 'prop-types';

function LazyLoadImg(props) {
    return (
        <Lazyload throttle={10} height={10}>
            <img {...props} />
        </Lazyload>
    )
}
LazyLoadImg.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    title: PropTypes.string,
    className: PropTypes.string
}

export default LazyLoadImg;