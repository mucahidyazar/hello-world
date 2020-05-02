import { Database, Listing } from '../../../lib/types';
import { ObjectId } from 'mongodb';
import { IResolvers } from 'apollo-server-express';

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (_parent: undefined, _args: {}, { db }: { db: Database }): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    }
  },

  Mutation: {
    deleteListing: async (_parent: undefined, args: { id: string }, { db }: { db: Database }): Promise<Listing> => {
      const deleteResult =  await db.listings.findOneAndDelete({
        _id: new ObjectId(args.id)
      });
      if(!deleteResult.value) {
        throw new Error('failed to delete listing');
      }
      return deleteResult.value;
    }
  },

  Listing: {
    id: (listing: Listing) => listing._id.toString(), //Cunku GraphQL de ID! oalrak tanimli ama databaseden number olarak geliyor.
  }
}