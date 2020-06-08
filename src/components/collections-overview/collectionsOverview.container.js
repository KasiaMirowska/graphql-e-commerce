import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import CollectionsOverview from './collections-overview.component';
import Spinner from '../../components/spinner/spinner.component'; 

//gql is a function for quering graphql db
const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }`;
   
const CollectionsOverviewContainer = ({match}) => (
    <Query query={GET_COLLECTIONS}>
        {/* // this query component from apollo returns a function that holds the object */}
        {
            ({loading, error, data}) => {
                console.log({loading, error,data}, 'FROM GRAPHQL')
                if(loading) return <Spinner/>
                return <CollectionsOverview collections={data.collections} />
            }
        }

    </Query>
)

export default CollectionsOverviewContainer;