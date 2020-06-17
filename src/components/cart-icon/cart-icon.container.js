import React from 'react';
import { Mutation, Query, graphql } from 'react-apollo';
import {flowRight} from 'lodash';
import { gql } from 'apollo-boost';
import CartIcon from './cart-icon.component';

//we're calling the mutation (with capital letter) that returns a resolver for toggleCartHidden
const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`;
const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`

// const CartIconContainer = () => (
//     <Query query={GET_ITEM_COUNT}>
//         {
//             ({ data: { itemCount } }) => (
//                 <Mutation mutation={TOGGLE_CART_HIDDEN}>
//                     {toggleCartHidden => {
//                         console.log('TOGLING?????????')
//                         return <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
//                     }}
//                 </Mutation>
//             )
//         }
//     </Query>
// )

//version with HOC: 
const CartIconContainer = (props) => {
    console.log(props, 'PROPS IN CART ICON CONTAINER')
    return (
        <CartIcon toggleCartHidden={props.toggleCartHidden} itemCount={props.data.itemCount} />
    )
}

export default flowRight(
    graphql(GET_ITEM_COUNT), 
    graphql(TOGGLE_CART_HIDDEN, {name: 'toggleCartHidden'})
)(CartIconContainer);