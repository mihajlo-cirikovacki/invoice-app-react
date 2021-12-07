// Import Style:
import '../styles/components/StatusButton.scss';

const StatusButton = ({status}) => {
  if(status === 'pending') {
    return (
      <section>
        <div className="status__button status__button--pending"><span className="status__button-circle status__button-circle--pending"></span>Pending</div> 
      </section>
    )
  } else if( status === 'paid'){
    return (
      <section>
          <div className="status__button status__button--paid"><span className="status__button-circle status__button-circle--paid"></span>Paid</div> 
      </section>
    )
  } else if( status === 'draft') {
    return (
      <section>
          <div className="status__button status__button--draft"><span className="status__button-circle status__button-circle--draft"></span>Draft</div> 
      </section>
    )
  }
}

export default StatusButton;













