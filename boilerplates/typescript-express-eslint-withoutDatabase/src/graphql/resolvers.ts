import { listings } from '../listing';

export const resolvers = {
  Query: {
    listings: () => {
      return listings;
    }
  },

  Mutation: {
    deleteListing: (_parent: undefined, args: { id: string }) => {
      for(let i = 0; i < listings.length; i++) {
        if(listings[i].id === args.id) {
          return listings.splice(i, 1)[0];
        }
      }

      throw new Error('failed to delete listing');
    }
  }
}