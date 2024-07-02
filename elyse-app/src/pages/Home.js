import React from 'react';
import logo from '../assets/images/elyse_logo.png';
import videoSrc from '../assets/videos/video_new.mp4';
import intersect from '../assets/images/Intersect.png';
import { Link } from 'react-router-dom';
import '../assets/styles/Home.css';

const Home = () => {
    return (
        <div className="div">
        <div className="div-2">
            <div className="div-3">
            <div className="name">ELYSE</div>
            <img loading="lazy" src={logo} className="img" alt="ELYSE Logo" />
                <div className="div-4">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c5eaaf953ef4726411ab0dc2621a0822f62185b88f6f9519f79f62e90a5f6141?"
                        className="img-2"
                        alt="Decorative"
                    />
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1111695dbbf3a8860adda1ff07fc680ee4e3d6ea94995fca6308ae7bf54a411?"
                        className="img-3"
                        alt="Decorative"
                    />
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/06299a5c64e2f6bf9bf4175ae801bceabe6099860fece086c46306c65dd69ba2?"
                        className="img-4"
                        alt="Decorative"
                    />
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/18e1292aa99f85cfcc972068f4cb682b6b2e1d659a6f7023e41efe677a1cd4eb?"
                        className="img-5"
                        alt="Decorative"
                    />
                </div>
            </div>
            <div className="div-5">
            <img loading="lazy" src={intersect} className="img-6" alt="Intersect" />
            <video autoPlay muted loop className="vid-6">
                <source src={videoSrc} type="video/mp4" />
            </video>
            <div className="div-6">All in one</div>
            <div className="div-7">Experiencing the Power of Blockchain</div>
            <div className="div-8">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a4ffdb6ee7819ce437fff3101d46f514ceacc1b0e8f290a2fba5c1bd64b8f99?" className="img-7" alt="7" />
            <div className="div-9">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/864207f9907234c649d0b3c570d44ab7bea6104c29bc55368f85b2d0e8988079?" className="img-8" alt="8" />
                <div className="div-10">
                    Master the world of cryptocurrency business: from basic knowledge to strategic decisions. We are here to support you at every step.
                </div>
                </div>
                <Link to="/app-page">
                    <button className="div-11">
                        <div className="div-12">Enter app</div>
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c0d699fabb2ab9d87f4b1e67a53067ac25397f39d676f58774088a94e8aeaa94?" className="img-9" alt="Button" />
                    </button>
                </Link>
            </div>
            </div>
        </div>
        </div>
    );
}

export default Home;