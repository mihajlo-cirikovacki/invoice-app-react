import Sidebar from './Sidebar';

// Import Style:
import '../../styles/components/Container.scss';

const Container = (props) => {
  return (
    <section className='container'>
      <Sidebar />
      {props.children}
    </section>
  )
}

export default Container;










