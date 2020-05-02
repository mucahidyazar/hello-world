//###Bunlar Listings Klasoru icinde tanimliydi. Custom olarak ellerimizle tanimlamistik. Fakat Apollo ile bunlari otomatik olarak icindeki bir method sayesinde tanimlayabiliyoruz.
//O yuzden buradaki typelar artik kullanilmiyor.
// import {
//   Listing,
//   ListingsData,
//   DeleteListingData,
//   DeleteListingVariables
// } from './types';

export interface Listing {
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
  rating: number;
}

export interface ListingsData {
  listings: Listing[]
}

export interface DeleteListingData {
  deleteListing: Listing;
}

export interface DeleteListingVariables {
  id: string;
}