import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styles from './styles.module.scss';

const ADD_EVENT = gql`
  mutation addEvent($date: Date, $habitId: ID) {
    addEvent(date: $date, habitId: $habitId) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`

const REMOVE_EVENT = gql`
  mutation addEvent($eventId: ID, $habitId: ID) {
    removeEvent(eventId: $eventId, habitId: $habitId) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`

const HabitButton = ({date, habitId, events}) => {

  const [addEvent] = useMutation(ADD_EVENT, {
    refetchQueries: ['getHabits']
  });

  const [removeEvent] = useMutation(REMOVE_EVENT, {
    refetchQueries: ['getHabits']
  });

  const foundDate = events.find((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === date.getDate();
  });

  return (
    <span className={styles.span}>
      {date.getMonth() + 1}/{date.getDate()}
      {
        foundDate 
        ? (
          <button className={styles.button} onClick={() => removeEvent({ variables: {
            habitId, eventId: foundDate._id
          } })}>X</button>
        ) 
        : (
          <button className={styles.button} onClick={() => addEvent({ variables: {
            habitId, date
          } })}>O</button>
        )
      }
      
    </span>
  );
};

export default HabitButton;