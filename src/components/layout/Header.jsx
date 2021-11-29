import Filter from '../Filter';
import ButtonHeader from '../ButtonHeader';

// Import Style:
import '../../styles/components/Header.scss';

const Header = ({totalCards}) => {
  
  return (
    <header className='header'>
      <div className='header__box--1'>
        <h1 className='header__heading'>Invoices</h1>
        <span className='header__total'>There are {totalCards} total invoices</span>
      </div>
      <div className='header__box--2'>
        <Filter />
        <ButtonHeader />
      </div>
    </header>
  )
}

export default Header;







