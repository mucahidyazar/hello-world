//TYPES.TSX
//Burada FETCH istegimizin return degeri icin interface belirliyoruz. 
//Generic olarak kullanip Promise verdirecegiz bu degerleri dondurecegine.
interface Listing {
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



//LISTING.TSX
import React, { FunctionComponent } from "react";
import { server } from '../../lib/api';
import { ListingsData } from './types';

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

interface Props {
  title: string
}

export const Listings: FunctionComponent<Props> = ({ title }: Props) => {

  const fetchListing = async () => {
    //BURADADA server.fetch fonksiyonuna Promise verdiriyoruz bu degerleri dondurmesi icin.
    //Bunun icin tanimladigimiz interfaceyi generic olarak basina yaziyoruz.
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(data);
  }

  return <div>
    <h2>{title}</h2>
    <button onClick={fetchListing}>Query Listings</button>
  </div>;
};



//SERVER.TSX
interface Body {
  query: string
}

export const server = {
  //Buradada gelecek Genericleri tanimliyoruz. ANY yaparak herturlu generici her turlu istekte farkli sekillerde yakalayabiliyor olacagiz.
  fetch: async<TData = any> (body: Body) => {
    const res = await fetch('/api', { //package.json da "proxy": "http://localhost:9000" tanimladigimizdan dolayi boyle istekte bulunabiliyoruz.
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body) //JSON yani obje olarak gonderemeyecegimiz icin yaziya ceviririz once
    });

    //Ve son olarak buradada return degerini as Promise yaparak donecek degeri yukarida yakaladigimiz genericle gelen degere interfaceye esitliyoruz.
    return res.json() as Promise<{ data: TData }>;
  }
};