//LONGWAY WITH GRAPHQL

import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} from 'graphql';
import { listings } from './listing';

const Listing = new GraphQLObjectType({
  name: 'Listing',
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLNonNull(GraphQLString) },
    address: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLNonNull(GraphQLString) },
    numOfGuests: { type: GraphQLNonNull(GraphQLInt) },
    numOfBeds: { type: GraphQLNonNull(GraphQLInt) },
    numOfBaths: { type: GraphQLNonNull(GraphQLInt) },
    rating: { type: GraphQLNonNull(GraphQLInt) }
  }
});



const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    listings: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(Listing))),
      resolve: () => listings
    }
  }
});
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    deleteListing: {
      type: GraphQLNonNull(Listing),
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve: (_parents, args, _ctx, _info) => {
        for(let i = 0; i < listings.length; i++) {
          if(listings[i].id === args.id) {
            return listings.splice(i, 1)[0];
          }
        }

        throw new Error('failed to delete listing');
      }
    }
  }
});

export const schema = new GraphQLSchema({
  query,
  mutation
});