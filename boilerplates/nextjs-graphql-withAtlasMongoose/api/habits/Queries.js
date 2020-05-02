import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language';

import Habits from './habits';

export const Queries = {
  Query: {
    habits: async (parent, args, ctx, info) => {
      try {
        const habits = await Habits.find();
        return habits;
        //console.log(habits);
        // return [
        //   {
        //     _id: "154551",
        //     name: "Some Name"
        //   },
        //   {
        //     _id: "154551",
        //     name: "Some Name"
        //   }
        // ];
      } catch(err) {
        console.error(err);
      }
    }
  },

  //DATE ICIN CUSTOM GRAPHQL TYPE TANIMLAMA
  Date: new GraphQLScalarType({
    name: 'Date',
    description: "Date custom scalar",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime(); //value sent to the client
    },
    parseLiteral(ast) {
      if(ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    }
  })
}