//called resolver because it is an object being pasted into the client in index that tells which features are 'resolved' when mutated. Mutation is changing data inside the db. THis file basicly sets up cache of data to replace redux

import {gql} from 'apollo-boost';
//we're writing a mutation to the db schema
//this is a set of types which completely describe the set of possible data you can query on that service.  we're writing extend although there is no mutations in db yet but it just makes it safe for the future when there will be so that graphql knows to use that method 
export const typeDefs = gql`
    extend type Mutation {
        ToggleCartHidden: Boolean!
    }
`

//first need to read the initial value of cart => this query specifies that we getting the value from cached data not directly from db
const GET_CART_HIDDEN = gql` 
    {
        cartHidden @client
    }
`
//actual mutation below that mirrors graphql server
// root is top level object that holds the type of the top level query or mutation
// args object containg all arguments we can access with this mutation
// _context is an object shared by all the resolvers of a specific execution. we can also just use it as destructered {cache}
export const resolvers = {
    Mutation: {
        toggleCartHidden:(_root, _args, {cache}, _info) => {
            const {cartHidden} = cache.readQuery({
                query: GET_CART_HIDDEN
            })
            //similar to setState, we're changing the boolean of cartHidden method
            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: {cartHidden: !cartHidden}
            });

            return !cartHidden;
        }
    }
}