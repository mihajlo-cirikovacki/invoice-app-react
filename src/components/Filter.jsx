
// Import Style:
import '../styles/components/Filter.scss';

import arrowDown from '../assets/icon-arrow-down.svg';
import { useState } from 'react';

const Filter = () => {
  const [options, setOptions] = useState(false)

  const getOptions = function() {
    if(options) setOptions(false)
      else setOptions(true);
  }

  return (
    <section className='filter'>
      <p className='filter__title'>Filter by status</p>
      <img className='filter__arrow-down' onClick={getOptions} src={arrowDown} alt="arrow down" />
      {options && 
        <div className='filter__options'>
          <div className='filter__option'>
            <span className="filter__checkbox"></span>
            <span className="filter__check-title">Paid</span>
          </div>
          <div className='filter__option'>
            <span className="filter__checkbox"></span>
            <span className="filter__check-title">Pending</span>
          </div>
          <div className='filter__option'>
            <span className="filter__checkbox"></span>
            <span className="filter__check-title">Paid</span>
          </div>
        </div>}
    </section>
  )
}

export default Filter;
















