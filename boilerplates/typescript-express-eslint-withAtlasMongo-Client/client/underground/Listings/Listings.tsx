import React, { FunctionComponent } from "react";
import { useQuery, useMutation } from 'react-apollo';
import {
  List,
  Avatar,
  Button,
  Spin,
  Alert
} from 'antd';
import { gql } from 'apollo-boost';
import { Listings as ListingsData } from './__generated__/Listings';
import { DeleteListing as DeleteListingData, DeleteListingVariables } from './__generated__/DeleteListing';
import './Listing.css';
import {
  ListingsSkeleton
} from './components';

const LISTINGS = gql`
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

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`

export const Listings: FunctionComponent<Props> = ({ title }: Props) => {

  const { data, loading, refetch, error } = useQuery<ListingsData>(LISTINGS);
  const listings = data ? data.listings : null;

  const [deleteListing, {
    loading: deleteListingLoading,
    error: deleteListingError
  }] = useMutation<DeleteListingData, DeleteListingVariables>(
    DELETE_LISTING
  );

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } })
    refetch();
  }
  
  const listingsList = listings ? (
    <List 
      itemLayout="horizontal" 
      dataSource={listings}
      renderItem={listing => (
        <List.Item actions={[<Button type="primary" onClick={() => handleDeleteListing(listing.id)}>Delete</Button>]}>
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={
              <Avatar 
                src={listing.image}
                shape="square"
                size={48} />
            } />
        </List.Item>
      )} />
  ) : null

  if(error) {
    return (
      <div>
        <ListingsSkeleton title={title} error />
      </div>
    )
  }
  if(loading) {
    return <div className="listings">
      <ListingsSkeleton title={title} />
    </div>;
  }

  const deleteListingErrorAlert = deleteListingError
  ? <Alert
      type="error"
      message="Uh oh! Something went wrong - please try again later :("
      className="listings__alert" />
  : null;
  
  return <div className="listings">
    <Spin spinning={deleteListingLoading}>
      {deleteListingErrorAlert}
      <h2>{title}</h2>
      {listingsList}
    </Spin>
  </div>;
};