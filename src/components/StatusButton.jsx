// Import Style:
import '../styles/components/StatusButton.scss';

const StatusButton = ({setPaid}) => {
  if(setPaid) {
    return (
      <section>
        <div className="status__button status__button--pending"><span className="status__button-circle status__button-circle--pending"></span>Pending</div> 
      </section>
    )
  } else {
    return (
      <section>
          <div className="status__button status__button--paid"><span className="status__button-circle status__button-circle--paid"></span>Paid</div> 
      </section>
    )
  }
}

export default StatusButton;













