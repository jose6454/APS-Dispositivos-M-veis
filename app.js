const { useState } = React;

const products = [
  { id: 1, name: 'Maçã', price: 4.99, image: 'https://th.bing.com/th?id=OIP.YE4xxTHptzOsqa4oMu4DGgHaIo&w=231&h=269&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
  { id: 2, name: 'Detergente', price: 2.39, image: 'https://th.bing.com/th/id/OIP.5oXg5IR1zgUJMqiabh_gsAHaHa?w=203&h=203&c=7&r=0&o=5&pid=1.7' },
  { id: 3, name: 'Macarrão', price: 3.49, image: 'https://th.bing.com/th/id/OIP.kTpxCkWD76qjufkCksgHbwHaHa?w=163&h=180&c=7&r=0&o=5&pid=1.7' },
  { id: 4, name: 'Sucrilhos', price: 10.0, image: 'https://th.bing.com/th?id=OIP.jSkWrV5q1FPNmcn3apBi8wHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
  { id: 5, name: 'Arroz', price: 24.99, image: 'https://th.bing.com/th?q=Saco+Arroz+5+Kg&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=pt-BR&cc=BR&setlang=pt-br&adlt=moderate&t=1&mw=247' }
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (product) => {
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    const updatedTotal = total + product.price;
    setCart(updatedCart);
    setTotal(updatedTotal);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    const updatedTotal = updatedCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setCart(updatedCart);
    setTotal(updatedTotal);
  };

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: parseInt(quantity) };
      }
      return item;
    });
    const updatedTotal = updatedCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setCart(updatedCart);
    setTotal(updatedTotal);
  };

  return (
    <div className="container">
      <h1>React Shopping Cart</h1>
      <div>
        {products.map(product => (
          <div key={product.id} className="product">
            <div className="product-info">
              <img src={product.image} alt={product.name} />
              <span>{product.name}</span>
            </div>
            <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart - ${product.price}</button>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Shopping Cart</h2>
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.name}</span>
            <span>${item.price}</span>
            <input 
              type="number" 
              value={item.quantity} 
              min="1" 
              onChange={(e) => updateQuantity(item.id, e.target.value)} 
              className="quantity-input"
            />
            <button className="remove-from-cart" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
        <div className="cart-total">Total: ${total.toFixed(2)}</div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
