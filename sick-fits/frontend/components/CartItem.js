import React from "react";
import formatMoney from "../lib/formatMoney";
import styled from "styled-components";
import PropTypes from "prop-types";
import RemoveFromCart from "./RemoveFromCart";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3 {
    margin: 0;
  }
`;

const CartItem = ({ cartItem }) => {
  if (!cartItem.item)
    return (
      <CartItemStyles>
        This item has been removed
        <RemoveFromCart id={cartItem.id} />
      </CartItemStyles>
    );

  return (
    <CartItemStyles>
      <img src={cartItem.item.image} width="100" alt={cartItem.item.title} />
      <div className="cart-item-details">
        <h3>{cartItem.item.title}</h3>
        <p>
          {formatMoney(cartItem.item.price)}
          {" - "}
          <em>
            {cartItem.quantity} &times;{" "}
            {formatMoney(cartItem.item.price * cartItem.quantity)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default CartItem;
