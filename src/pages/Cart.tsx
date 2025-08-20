import { useCartStore } from "../cartStore";

const Cart = () => {
  const items = useCartStore((state) => state.items);

  return (
    <div>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        items.map((item) => (
          <div key={item.id}>
            {item.title} - {item.quantity} × ${item.price}
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
