import classes from './MeetupDetail.module.css'
import Card from '../../components/ui/Card'

const MeetupDetail = ({ image, title, address, description }) => {
  return <Card>
    <section className={classes.detail}>
    <img src={image} alt={title} />
    <article>
      <h3>{title}</h3>
      <address>{address}</address>
      <p>{description}</p>
    </article>
  </section>
  </Card>
}

export default MeetupDetail;
