import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  removeItem,
  updateQuantity,
  selectCartItems,
  selectCartCount,
  selectCartTotal
} from './CartSlice';

import './CartItem.css';

const getPrice = (cost) => {
  const price = Number.parseFloat(
    String(cost).replace(/[^0-9.]/g, '')
  );

  return Number.isFinite(price) ? price : 0;
};

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();

  const cart = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const cartTotal = useSelector(selectCartTotal);

  const [checkoutMessage, setCheckoutMessage] = useState('');

  // Calculate total cart amount
  const calculateTotalAmount = () => {
    return cartTotal.toFixed(2);
  };

  // Calculate the subtotal for an individual plant
  const calculateTotalCost = (item) => {
    return (getPrice(item.cost) * item.quantity).toFixed(2);
  };

  // Increase plant quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      id: item.id,
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  // Decrease plant quantity
  const handleDecrement = (item) => {
    dispatch(updateQuantity({
      id: item.id,
      name: item.name,
      quantity: item.quantity - 1
    }));
  };

  // Delete plant from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Return to the product listing page
  const handleContinueShopping = (event) => {
    onContinueShopping(event);
  };

  // Show checkout message
  const handleCheckout = () => {
    setCheckoutMessage('Coming Soon! Checkout is not yet available.');
  };

  return (
    <div className="cart-container">

      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <h3 style={{ color: 'black' }}>
        Total Cart Items: {cartCount}
      </h3>

      {cart.length === 0 ? (
        <p style={{ color: 'black', textAlign: 'center' }}>
          Your shopping cart is empty.
        </p>
      ) : (
        <div>
          {cart.map(item => (
            <div
              className="cart-item"
              key={item.id ?? item.name}
            >
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-details">

                <div className="cart-item-name">
                  {item.name}
                </div>

                <div className="cart-item-cost">
                  Unit Price: {item.cost}
                </div>

                <div className="cart-item-quantity">

                  <button
                    type="button"
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>

                  <span className="cart-item-quantity-value">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>

                </div>

                <div className="cart-item-total">
                  Total: ${calculateTotalCost(item)}
                </div>

                <button
                  type="button"
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      )}

      <div className="continue_shopping_btn">

        <button
          type="button"
          className="get-started-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>

        <br />

        <button
          type="button"
          className="get-started-button1"
          onClick={handleCheckout}
        >
          Checkout
        </button>

        {checkoutMessage && (
          <p
            role="status"
            style={{
              color: '#176a32',
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: '16px'
            }}
          >
            {checkoutMessage}
          </p>
        )}

      </div>

    </div>
  );
};

export default CartItem;
