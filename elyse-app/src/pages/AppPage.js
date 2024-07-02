import React, { useState, useEffect } from 'react';
import '../assets/styles/appPage.css';
import { DragDropContext } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import CardGroup from '../components/CardGroup';
import { onDragEnd } from '../utils/dragAndDrop';
import { connectWallet, getWalletInfo } from '../utils/wallet';
import nft_gif from '../assets/images/nft_gif.gif';
import earn_gif from '../assets/images/earn.gif';

const AppPage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState({
    'group-1': [
      { id: '1', group: 'large', content: { img: 'https://www.blog.goosefx.io/content/images/2023/01/USDC-to-SOL.gif', alt: 'Image 1', text: 'DEX', url: '/dex' } },
      { id: '2', group: 'large', content: { img: 'https://bitcoinist.com/wp-content/uploads/2023/09/Solana-staking-Lido-DAO.jpeg', alt: 'Image 2', text: 'STAKING', url: '/staking' } }
    ],
    'group-2': [
      { id: '3', group: 'small', content: { img: nft_gif, alt: 'Image 3', text: 'NFT Hub', url: '/nft-hub' } },
      { id: '4', group: 'small', content: { img: 'https://iotex.io/blog/content/images/size/w2000/2023/11/DePIN-X-RWA.png', alt: 'Image 4', text: 'RWA & DePIN', url: '/rwa-depin' } },
      { id: '5', group: 'small', content: { img: earn_gif, alt: 'Image 5', text: 'Earning Hub', url: '/earning-hub' } },
      { id: '6', group: 'small', content: { img: 'https://cdn.dribbble.com/userupload/9178530/file/still-651073b0e402dd6a891f706f402ee84b.png?resize=400x300&vertical=center', alt: 'Image 6', text: 'Learning Hub', url: '/learning-hub' } },
      { id: '7', group: 'small', content: { img: 'https://pbs.twimg.com/media/F8FMuggWsAAfyMy?format=jpg&name=medium', alt: 'Image 7', text: 'Solcial FI', url: '/solcial-fi' } }
    ],
    'group-3': [
      { id: '8', group: 'large', content: { img: 'https://techcrunch.com/wp-content/uploads/2023/08/GettyImages-1424828162.jpg?w=730&crop=1', alt: 'Image 8', text: 'Gaming zone', url: '/gaming-zone' } },
      { id: '9', group: 'large', content: { img: 'https://prikhodko.com.ua/wp-content/uploads/2023/05/3d-internet-secuirty-badge-1024x1024.jpg', alt: 'Image 9', text: 'Safety', url: '/safety' } }
    ],
  });

  useEffect(() => {
    document.querySelector('#wallet-connect .button').addEventListener('click', async () => {
      await connectWallet();
    });

    const fetchWalletInfo = async () => {
      const walletInfo = await getWalletInfo();
      if (walletInfo) {
        const walletEvent = new CustomEvent('walletInfo', {
          detail: walletInfo
        });
        document.dispatchEvent(walletEvent);
      }
    };

    fetchWalletInfo().catch(console.error);

    const handleCardClick = (event) => {
      var card = event.target.closest('.card');
      if (!card) return;

      var contentUrl = card.getAttribute('data-content-url');
      if (!contentUrl) {
        console.error('Content URL is missing for', card);
        return;
      }

      navigate(contentUrl);
    };

    document.addEventListener('click', handleCardClick);

    return () => {
      document.removeEventListener('click', handleCardClick);
    };
  }, []);

  return (
    <div>
      <nav className="main-menu">
        <ul>
          <li>
            <a href="#">
              <i className="fa fa-home nav-icon"></i>
              <span className="nav-text">Home</span>
            </a>
          </li>
          <li>
            <a data-modal-target="#modal1" href="">
              <i className="fa fa-bell nav-icon"></i>
              <span className="nav-text">Notification</span>
            </a>
          </li>
          <li>
            <a data-modal-target="#modal2" href="dashboard/index.html" id="my-assets-connect">
              <i className="fa fa-wallet nav-icon"></i>
              <span className="nav-text">Cabinet</span>
            </a>
          </li>
          <li>
            <a data-modal-target="#modal3" href="cyberpunk_gallery/index.html">
              <i className="fa fa-images nav-icon"></i>
              <span className="nav-text">My NFT Gallery</span>
            </a>
          </li>
          <li>
            <a data-modal-target="#modal4" href="">
              <i className="fa fa-envelope nav-icon"></i>
              <span className="nav-text">Messages</span>
            </a>
          </li>
        </ul>
        <ul className="logout">
          <li>
            <a data-modal-target="#modal5" href="">
              <i className="fa fa-cogs nav-icon"></i>
              <span className="nav-text">Settings</span>
            </a>
          </li>
          <li>
            <a href="../index.html">
              <i className="fa fa-right-from-bracket nav-icon"></i>
              <span className="nav-text">
                Logout
              </span>
            </a>
          </li>
        </ul>
      </nav>
      <nav className="btn-nav">
        <ul>
          <div className="button-container" id="wallet-connect">
            <button className="button">Connect wallet</button>
          </div>
        </ul>
      </nav>
      <div className="container">
        <div className="blob-c">
          <div className="shape-blob"></div>
          <div className="shape-blob one"></div>
          <div className="shape-blob two"></div>
          <div className="shape-blob three"></div>
          <div className="shape-blob four"></div>
          <div className="shape-blob five"></div>
          <div className="shape-blob six"></div>
        </div>
        <section>
          <DragDropContext onDragEnd={(result) => onDragEnd(result, groups, setGroups)}>
            {Object.keys(groups).map(groupId => (
              <CardGroup
                key={groupId}
                id={groupId}
                items={groups[groupId]}
              />
            ))}
          </DragDropContext>
        </section>
      </div>
    </div>
  );
}

export default AppPage;
