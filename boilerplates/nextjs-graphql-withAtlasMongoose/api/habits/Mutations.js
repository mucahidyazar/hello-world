import Habits from './habits';

export const Mutations = {
  Mutation: {
    addHabit: async (parent, args, ctx, info) => {
      try {
        const newHabit = await Habits.create({
          ...args.habit
        });
        return newHabit;
      } catch (err) {
        console.error(err);
      }
    },
    addEvent: async (parents, args, ctx, info) => {
      const { habitId, date } = args;
      try {
        date.setHours(0,0,0,0);
        const habit = await Habits.findOneAndUpdate(
          {
            _id: habitId,
            'events.date': {
              $ne: date
            }
          }, {
            $addToSet: {
              events: {
                date
              }
            }
          }
        )
        return habit;
      } catch(err) {
        console.error(err);
      }
    },
    removeEvent: async (parents, args, ctx, info) => {
      const { habitId, eventId } = args;
      try {
        const habit = await Habits.findOneAndUpdate(
          {
            _id: habitId
          }, {
            $pull: {
              events: {
                _id: eventId
              }
            }
          })
        return habit;
      } catch(err) {
        console.error(err);
      }  
    }
  }
}