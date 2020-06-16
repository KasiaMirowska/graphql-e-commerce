import React from 'react';
import {Mutation} from 'react-apollo';
import {gql} from 'apollo-boost';
import CartIcon from './cart-icon.component';

//we're calling the mutation (with capital letter) that returns a resolver for toggleCartHidden
const TOGGLE_CART_HIDDEN = gql `
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`;

const CartIconContainer = () => (
    <Mutation mutation={TOGGLE_CART_HIDDEN}>
        {
            toggleCartHidden => {
                console.log('TOGLING?????????')
                return <CartIcon toggleCartHidden={toggleCartHidden} />
            }
        }
    </Mutation>
)

export default CartIconContainer;