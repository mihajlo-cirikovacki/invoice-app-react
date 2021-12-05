
// Import Styles:
import '../../styles/components/Sidebar.scss';

import moon from '../../assets/icon-moon.svg';
import sun from '../../assets/icon-sun.svg';
import avatar from '../../assets/image-avatar.jpg'


const Sidebar = () => {

  const toggleDardLightMode = function(e) {
    document.documentElement.classList.toggle('dark-mode');
    const img = e.target;
    const imgSrc = img.getAttribute('src');
    img.src = imgSrc === moon ? sun : moon;
  }

  return (
    <aside className='aside'>
      <div className='aside__logo-container'>
        <svg className='aside__logo' xmlns="http://www.w3.org/2000/svg" width="28" height="26"><path fill="#FFF" fillRule="evenodd" d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"/></svg>
      </div>
      <div className='aside__container'>
        <div className='aside__btn-mode' onClick={toggleDardLightMode}>
          <img src={moon} alt="dark mode" />
        </div>
        <div className='aside__avatar-container'>
          <img className='aside__avatar' src={avatar} alt="avatar" />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar;







