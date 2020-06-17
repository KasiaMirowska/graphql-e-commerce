import React from 'react';
import { Mutation, Query } from 'react-apollo';
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

const CartIconContainer = () => (
    <Query query={GET_ITEM_COUNT}>
        {
            ({ data: { itemCount } }) => (
                <Mutation mutation={TOGGLE_CART_HIDDEN}>
                    {toggleCartHidden => {
                        console.log('TOGLING?????????')
                        return <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
                    }}
                </Mutation>
            )
        }
    </Query>
)

export default CartIconContainer;