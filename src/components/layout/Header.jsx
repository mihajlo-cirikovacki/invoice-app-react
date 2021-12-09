import Filter from '../Filter';
import ButtonHeader from '../ButtonHeader';

// Import Style:
import '../../styles/components/Header.scss';

const Header = ({totalCards}) => {
  
  return (
    <header className='main-header'>
      <div className='main-header__box--1'>
        <h1 className='main-header__heading'>Invoices</h1>
        <span className='main-header__total'>There are {totalCards} total invoices</span>
      </div>
      <div className='main-header__box--2'>
        <Filter />
        <ButtonHeader />
      </div>
    </header>
  )
}

export default Header;







