import React, { useState, useEffect } from "react";
import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import PurchaseForm from "./PurchaseForm"; 
import axios from "axios";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, purchase, } = useShoppingCart();
  const [storeItems, setStoreItems] = useState([]);
  const [isPurchaseFormOpen, setPurchaseFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setStoreItems(response.data);
      } catch (error) {
        console.error("Error fetching store items:", error);
      }
    };

    fetchData();
  }, []);

  const total = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((i) => i.id === cartItem.id);
    const itemTotal = (item?.price || 0) * cartItem.quantity;
    return total + itemTotal;
  }, 0);
  

  const handlePurchase = async () => {
    try {
      const userData = {
        name: name || "Default Name",
        email: email || "default@email.com",
        cartItems: cartItems.map((item) => ({ id: item.id, quantity: item.quantity })),
      };

      console.log("Data to be sent:", userData);

      const response = await axios.post("http://localhost:3000/api/purchase", userData);
      console.log("Response Data:", response.data);

      if (response.status === 201) {
        console.log("Purchase successful");
      } else {
        console.error("Failed to make a purchase");
      }
    } catch (error) {
      console.error("Error purchasing items:", error);
    }
  };

  const openPurchaseForm = () => {
    setPurchaseFormOpen(true);
  };

  const closePurchaseForm = () => {
    setPurchaseFormOpen(false);
  };

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total {formatCurrency(total)}
          </div>
          <Button onClick={() => { handlePurchase(); closePurchaseForm(); }}>Purchase</Button>
          <Button onClick={openPurchaseForm}>Open Purchase Form</Button>

          {isPurchaseFormOpen && (
            <PurchaseForm
              onSubmit={(userData) => {
                purchase(userData);
                setName("");
                setEmail("");
                
              }}
              name={name}
              email={email}
              setName={setName}
              setEmail={setEmail}
            />
          )}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}