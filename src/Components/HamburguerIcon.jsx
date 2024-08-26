import { useState, useEffect } from "react";
import "./HamburguerIcon.css";

function HamburguerIcon({ toggleNavbar, resetIcon }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    const newState = !isActive;
    setIsActive(newState);
    toggleNavbar(newState);
  };

  // Reset icon when the Navbar is closed
  useEffect(() => {
    if (!resetIcon) {
      setIsActive(false);
    }
  }, [resetIcon]);

  return (
    <section className="menu-section">
      <div className={`menu-btn ${isActive ? 'active' : ''}`} onClick={handleClick}>
      <div className="cart-icon">
          <img  src='src/assets/cart/white-cart.png'  alt="cart" />
        </div>
        
        <div className="menu-btn-burger"></div>
      </div>
    </section>
  );
}

export default HamburguerIcon;
