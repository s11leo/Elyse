import React, { useEffect, useRef } from 'react';
import './App.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import frontImage from './front.png';
// import axios from 'axios';

// import DiscordLogin from './DiscordLogin';
// import DiscordChat from './DiscordChat';

// import './ba0f12b23d22c550.css';
// import './54c1bebd51710be7.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const imageRef = useRef(null);

  // const handleLoginSuccess = (token) => {
  //   setToken(token);
  // };

  useEffect(() => {
    const image = imageRef.current;

    const handleLoad = () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".wrapper",
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: true,
          markers: false,
        }
      })
      .to(image, {
        scale: 2,
        z: 350,
        transformOrigin: "center center",
        ease: "power1.inOut"
      })
      .to(
        ".section.hero",
        {
          scale: 1.1,
          transformOrigin: "center center",
          ease: "power1.inOut"
        },
        "<"
      );
      
      image.classList.add('visible');
    };

    if (image.complete) {
      handleLoad();
    } else {
      image.addEventListener('load', handleLoad);
    }

    return () => {
      if (!image.complete) {
        image.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  // useEffect(() => {
  //   const hash = window.location.hash;
  //   if (hash) {
  //     const token = new URLSearchParams(hash.substring(1)).get('access_token');
  //     if (token) {
  //       setToken(token);
  //       // Очистить хэш из URL после извлечения токена
  //       window.history.replaceState(null, null, ' ');
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (token) {
  //     axios.get('http://localhost:3001/auth/discord/callback', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }).then(response => {
  //       console.log('User data:', response.data);
  //     }).catch(error => {
  //       console.error('Error fetching user data:', error);
  //     });
  //   }
  // }, [token]);

  return (
    <div className="wrapper">
      <div className="content">
        <section className="section hero"></section>
        <section className="section gradient-purple">
          <div className="kumeka-content">
            {/* <header>
              <h1>Welcome to Kumeka Team</h1>
            </header> */}
            <main>
              <div className="notion-header__cover has-cover">
                <img
                  alt="Welcome to Kumeka Team (EN)"
                  className="notion-header__cover-image"
                  src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/f221e6fe-89ee-4a2d-a57e-6d40ff4ee0c5/2/w=3840,quality=90,fit=scale-down"
                />
              </div>
              <div className="notion-header__content has-cover has-icon-image">
                <div className="notion-header__title-wrapper">
                  <div className="notion-header__icon-wrapper has-cover has-icon-image">
                    <img
                      alt="Welcome to Kumeka Team (EN)"
                      className="notion-header__icon"
                      src="https://assets.super.so/5b0b029c-3a4f-46b5-a975-c156bed7bcaf/images/e38c0fbc-406e-48af-a1a1-58dab8d96424/Avatar_-_symbol_2.svg"
                    />
                  </div>
                  <h1 className="notion-header__title">Welcome to Kumeka Team</h1>
                </div>
              </div>
              <article className="notion-root full-width">
                <div className="notion-column-list">
                  <div className="notion-column">
                    <h2>🧗🏽 Mission</h2>
                    <p>
                      We help the most promising projects in the <strong>Solana</strong> ecosystem
                      launch and grow. We are organized as a collective of creatives, developers, and
                      operators who are experienced in launching and growing technology businesses.
                    </p>
                    <p>
                      We value the sovereignty that comes with founding a company, the skin in the
                      game that comes with investing, and the joy that comes with getting sh*t done.
                      In a pre-crypto world, we had to fit into broiler categories — founder, investor,
                      or employee. Crypto allows us to be free-range and be all 3 at the same time.
                    </p>
                    <p>
                      This workspace is raw, WIP, and meant for our<em> </em>community. We're turning
                      our organization inside-out so you can lurk, find opportunities, and join us on
                      this adventure.
                    </p>
                  </div>
                  <div className="notion-column">
                    <h2>⛺ Get Involved</h2>
                    <div className="notion-callout bg-purple-light border">
                      <div className="notion-callout__icon">
                        <span className="notion-icon text">💰</span>
                      </div>
                      <div className="notion-callout__content">
                        <span>
                          Complete{' '}
                          <a
                            href="https://earn.superteam.fun/?utm_source=superteam&amp;utm_medium=notion&amp;utm_campaign=website"
                            className="notion-link link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <strong>Bounties</strong>
                          </a>{' '}
                          to earn crypto and get community membership.
                        </span>
                      </div>
                    </div>
                    <div className="notion-callout bg-purple-light border">
                      <div className="notion-callout__icon">
                        <span className="notion-icon text">💼</span>
                      </div>
                      <div className="notion-callout__content">
                        <span>
                          Ready to join Web3 full-time? Check out our{' '}
                          <a
                            href="https://superteam-jobs.pallet.com/jobs"
                            className="notion-link link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <strong>Job Board</strong>
                          </a>{' '}
                          to find work at high-growth startups.
                        </span>
                      </div>
                    </div>
                    <div className="notion-callout bg-purple-light border">
                      <div className="notion-callout__icon">
                        <span className="notion-icon text">👑</span>
                      </div>
                      <div className="notion-callout__content">
                        <span>
                          Are you building on Solana?{' '}
                          <a
                            href="https://airtable.com/appTvdDkoNp2RsCGm/shrtiAIKZWxb3hRCd"
                            className="notion-link link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <strong>Reach out</strong>
                          </a>
                          , we'd love to work with you.
                        </span>
                      </div>
                    </div>
                    <div className="notion-callout bg-red-light border">
                      <div className="notion-callout__icon">
                        <span className="notion-icon text">🚧</span>
                      </div>
                      <div className="notion-callout__content">
                        <span>
                          <em>Kumeka team is in experimental beta. Enter at your own risk.</em>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </main>
          </div>
        </section>
        <section className="section gradient-blue">
          {/* <h1>Discord Chat</h1>
          {!token ? (
            <DiscordLogin onSuccess={handleLoginSuccess} />
          ) : (
            <DiscordChat token={token} />
          )} */}
        </section>
      </div>
      <div className="image-container">
        <img ref={imageRef} src={frontImage} alt="front" className="image visible" />
      </div>
    </div>
  );
}

export default App;