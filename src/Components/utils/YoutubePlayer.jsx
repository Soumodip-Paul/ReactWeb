import React from 'react'
import PropTypes from 'prop-types'

export const YoutubePlayer = ({ width, height, padding, videoId, autoplay }) => {
    return (
        <iframe style={{ width: width, height: height, padding: padding }}
            src={"https://www.youtube.com/embed/" + videoId + (autoplay ? "?&autoplay=1" : '')}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
    )
}

export const changeYoutubeVideo = (text) => {
    const find = ['[:', ':]'];
    const replace = [`<div class="w-100 text-center"><iframe class="m-0 p-3 yt-video"
        src="https://www.youtube.com/embed/`, `?&autoplay=0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen></iframe></div>`];
    for (var i = 0; i < find.length; i++) {
        text = text.replace(find[i], replace[i]);
    }
    return text;
}

YoutubePlayer.defaultProps = {
    videoId: "RelXQt3Q9K8",
    width: "100%",
    height: "100vh",
    padding: "20px",
    autoplay: false
}
YoutubePlayer.propTypes = {
    videoId: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    padding: PropTypes.string,
    autoplay: PropTypes.bool
}