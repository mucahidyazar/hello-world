import HabitButton from '../HabitButton';
import styles from './styles.module.scss';

const colors = [
  "#718096",
  "#f56565",
  "#f6e05e",
  "#68d391",
  "#63b3ed"
]

const Habit = ({ habit, index }) => {
  const dates = getLast5Days();
  return (
    <article className={styles.article}>
      <h3 style={{borderColor: colors[index]}}>{habit.name}</h3>
      <div className={styles.buttons}>
      {
        dates.map((date, i) => (
          <HabitButton key={i} date={date} habitId={habit._id} events={habit.events} />
        ))
      }
      </div>
      <style jsx>
        {`
          h3 {
            margin-top: 0;
            border-bottom: solid 4px ${colors[index]};
          }
        `}
      </style>
    </article>
  );
};

const getLast5Days = () => {
  const dates = '01234'.split('').map(day => {
    const tempDate = new Date();
    tempDate.setDate( tempDate.getDate() - day );
    return tempDate;
  });
  return dates;
}

export default Habit;