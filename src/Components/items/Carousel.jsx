import React from 'react'

export const Carousel = () => {
    return (
        <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className="active" aria-current="true"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item">
                    <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#61dafb" /></svg>

                    <div className="container">
                        <div className="carousel-caption text-start">
                            <h1>Example headline.</h1>
                            <p>Some representative placeholder content for the first slide of the carousel.</p>
                            <p><button className="btn btn-lg btn-primary">Register Now</button></p>
                        </div>
                    </div>
                </div>
                <div className="carousel-item active">
                    {/* <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"/></svg> */}
                    <img src="./assets/image/jusc.jpg" className="d-block w-100" alt="..." />

                    <div className="container">
                        <div className="carousel-caption">
                            <img src="./assets/image/cool developer.gif" width="200px" height="200px" className="d-block my-4 rounded-circle text-center mx-auto" alt="JUSC" />
                            <h1 className="text-white roboto">Welcome to Cool Developer</h1>
                            <p className="roboto-slab">Cool Developer Official Website welcomes you</p>
                            <p><a className="btn btn-lg btn-outline-light" href="https://google.com">Learn more</a></p>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777" /></svg>

                    <div className="container">
                        <div className="carousel-caption text-end">
                            <h1>One more for good measure.</h1>
                            <p>Some representative placeholder content for the third slide of this carousel.</p>
                            <p><a className="btn btn-lg btn-primary" href="https://google.com">Browse gallery</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}
