import { Collection, ObjectId } from 'mongodb';

//MongoDB 'deki ObjectId Unique oldugu icin ayni sekilde direk id miz icinde kullaniyoruz.
export interface Listing {
  _id: ObjectId,
  title: string,
  image: string,
  address: string,
  price: number,
  numOfGuests: number,
  numOfBeds: number,
  numOfBaths: number,
  rating: number
}

//db.listing deki listing Collection olarak ayarlaniyor.
export interface Database {
  listings: Collection<Listing>;
}