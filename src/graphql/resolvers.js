import { gql } from 'apollo-boost';
import { addItemToCart, getCartItemCount } from './cart.utils';

//called resolver because it is an object being pasted into the client in index that tells which features are 'resolved' when mutated. Mutation is changing data inside the db. THis file basicly sets up cache of data to replace redux

//we're writing a mutation to the db schema
//this is a set of types which completely describe the set of possible data you can query on that service.  we're writing extend although there is no mutations in db yet but it just makes it safe for the future when there will be so that graphql knows to use that method 
export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }
  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
  }
`;


//writtig queries:
//first need to read the initial value of cart => this query specifies that we getting the value from cached data not directly from db
const GET_CART_HIDDEN = gql` 
    {
        cartHidden @client
    }
`;

const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`;

const GET_ITEM_COUNT = gql`
    {
        itemsCount @client
    }
`
//actual mutation below that mirrors graphql server
// root is top level object that holds the type of the top level query or mutation
// args object containg all arguments we can access with this mutation
// _context is an object shared by all the resolvers of a specific execution. we can also just use it as destructered {cache}
export const resolvers = {
    Mutation: {
      toggleCartHidden: (_root, _args, { cache }) => {
        const { cartHidden } = cache.readQuery({
          query: GET_CART_HIDDEN
        });
  
        cache.writeQuery({
          query: GET_CART_HIDDEN,
          data: { cartHidden: !cartHidden }
        });
  
        return !cartHidden;
      },
  
      addItemToCart: (_root, { item }, { cache }) => {
        const { cartItems } = cache.readQuery({
          query: GET_CART_ITEMS
        });
  
        const newCartItems = addItemToCart(cartItems, item);
  
        cache.writeQuery({
          query: GET_ITEM_COUNT,
          data: { itemCount: getCartItemCount(newCartItems) }
        });
  
        cache.writeQuery({
          query: GET_CART_ITEMS,
          data: { cartItems: newCartItems }
        });
  
        return newCartItems;
      }
    }
  };