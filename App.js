import { useState } from "react";
import data from "./data.json";

function App() {
  const [addCart, setAddCart] = useState([]);
  const [items, setItems] = useState(
    data.map((item) => ({ ...item, quantity: 0 }))
  );

  return (
    <div className="all">
      <h1>Desserts</h1>
      <Menu
        addCart={addCart}
        setAddCart={setAddCart}
        items={items}
        setItems={setItems}
      />
      <Form addCart={addCart} setAddCart={setAddCart} />
    </div>
  );
}

function Menu({ addCart, setAddCart, items, setItems }) {
  return (
    <div>
      <ul>
        <Element
          addCart={addCart}
          setAddCart={setAddCart}
          items={items}
          setItems={setItems}
        />
      </ul>
    </div>
  );
}

function Element({ addCart, setAddCart, items, setItems }) {
  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      fill="none"
      viewBox="0 0 21 20"
    >
      <g fill="#C73B0F" clip-path="url(#a)">
        <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
        <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M.333 0h20v20h-20z" />
        </clipPath>
      </defs>
    </svg>
  );
  const handleIncrement = (el) => {
    setItems(
      items.map((item) => {
        if (item.name === el.name) {
          item.quantity += 1;
        }
        return item;
      })
    );

    setAddCart((prevItems) =>
      prevItems.map((item) =>
        item.name === el.name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (el) => {
    setItems(
      items.map((item) => {
        if (item.name === el.name && item.quantity > 0) {
          item.quantity -= 1;
        }
        return item;
      })
    );

    setAddCart((prevItems) =>
      prevItems
        .map((item) =>
          item.name === el.name && item.quantity > 0
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const handleAddToCart = (el) => {
    setItems(
      items.map((item) => {
        if (item.name === el.name) {
          item.quantity += 1;
        }
        return item;
      })
    );

    setAddCart((prevItems) => {
      const itemExists = prevItems.find((item) => item.name === el.name);
      if (itemExists) {
        return prevItems.map((item) =>
          item.name === el.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            name: el.name,
            img: el.image.desktop,
            price: el.price,
            quantity: 1,
          },
        ];
      }
    });
  };

  return (
    <div className="contenier">
      {items.map((el) => (
        <div key={el.name}>
          <img src={el.image.desktop} alt={el.name} />
          {el.quantity > 0 && (
            <button
              className="btn-el"
              style={{ backgroundColor: "red", border: "5px" }}
            >
              <button
                style={{
                  borderRadius: "50%",
                  marginRight: "30px",
                  border: "0",
                }}
                onClick={() => handleIncrement(el)}
              >
                <img
                  src="/images/icon-increment-quantity.svg"
                  style={{
                    backgroundColor: "red",

                    width: "10px",
                    height: "10px",
                    padding: "10px",
                  }}
                  alt="+"
                />
              </button>
              {el.quantity}
              <button
                style={{ borderRadius: "50%", marginLeft: "30px", border: "0" }}
                onClick={() => handleDecrement(el)}
              >
                <img
                  src="/images/icon-decrement-quantity.svg"
                  style={{
                    backgroundColor: "red",
                    width: "10px",
                    height: "10px",
                    padding: "10px",
                  }}
                  alt="+"
                />
              </button>
            </button>
          )}

          {el.quantity === 0 && (
            <button className="btn-el" onClick={() => handleAddToCart(el)}>
              {icon} Add to cart
            </button>
          )}
          <p>{el.category}</p>
          <h3>{el.name}</h3>
          <p>${el.price}</p>
        </div>
      ))}
    </div>
  );
}

function Form({ addCart, setAddCart }) {
  const calculateTotal = () => {
    return addCart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div>
      <h3 className="cart-summary" style={{ color: "hsl(14, 86%, 42%)" }}>
        Your Cart ({addCart.length})
      </h3>

      {addCart.map((item, index) => (
        <CartItem
          key={index}
          item={item}
          setAddCart={setAddCart}
          addCart={addCart}
        />
      ))}

      <p
        style={{
          marginTop: "30px",
          fontSize: "25px",
          fontFamily: "sans-serif",
        }}
      >
        Order total{" "}
        <strong style={{ paddingLeft: "60px" }}>${calculateTotal()}</strong>
      </p>
      <p
        className="ccart-item"
        style={{
          paddingTop: "50px",
          borderBottom: "0px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img
          src="/images/icon-carbon-neutral.svg"
          style={{ width: "30px", height: "auto" }}
          alt="icon"
        />
        this is a <strong>carbon-neutral</strong> delivery
      </p>
      <button className="btn-order">Confirm order</button>
    </div>
  );
}

function Confirm({ addCart }) {
  return (
    <div>
      <h1>Order confirmed ✈</h1>
      <p>We hope you enjoy your food</p>
      {addCart.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </div>
  );
}

function Item({ item }) {
  return (
    <div className="cart-item" style={{ zIndex: "10" }}>
      <div>
        <p style={{ paddingBottom: "10px" }}>{item.name}</p>
        <p>
          <strong style={{ color: "hsl(14, 86%, 42%)" }}>
            {item.quantity}X
          </strong>{" "}
          @${item.price} each = @${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
function CartItem({ item, setAddCart, addCart }) {
  const removeItem = (itemName) => {
    setAddCart(addCart.filter((cartItem) => cartItem.name !== itemName));
  };

  return (
    <div className="cart-item">
      <div>
        <p style={{ paddingBottom: "10px" }}>{item.name}</p>
        <p>
          <strong style={{ color: "hsl(14, 86%, 42%)" }}>
            {item.quantity}X
          </strong>{" "}
          @${item.price} each = @${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      <img
        style={{ paddingLeft: "40px", cursor: "pointer" }}
        src="/images/icon-remove-item.svg"
        alt="Remove item"
        onClick={() => removeItem(item.name)}
      />
    </div>
  );
}

export default App;
