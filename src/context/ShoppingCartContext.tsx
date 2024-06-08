import { createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: React.ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const purchase = async (userData: { name: string; email: string; cartItems: CartItem[] }) => {
  const { name, email, cartItems } = userData;

  try {
    const response = await fetch("http://localhost:3000/api/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, cartItems }),
    });

    console.log("Response Status:", response.status);
    const responseData = await response.json();
    console.log("Response Data:", responseData);

    if (response.ok) {
      console.log("Purchase successful");
    } else {
      console.error("Failed to make a purchase");
    }
  } catch (error) {
    console.error("Error making a purchase:", error);
  }
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  updateProductAmount: (id: number, newAmount: number) => void;
  getItemInfo: (id: number) => Promise<Item | null>;
  cartQuantity: number;
  cartItems: CartItem[];
  purchase: (userData: { name: string; email: string, cartItems: CartItem[] }) => Promise<void>;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);

  if (!context) {
    throw new Error("useShoppingCart must be used within a ShoppingCartProvider");
  }

  return context;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);
  const [productAmounts, setProductAmounts] = useLocalStorage<{ [key: number]: number }>(
    "product-amounts",
    { 1: 100, 2: 150, 3: 200 }
  );

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            const updatedAmount = productAmounts[id] - 1;
            setProductAmounts((prevAmounts) => ({ ...prevAmounts, [id]: updatedAmount }));
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      const itemToRemove = currItems.find((item) => item.id === id);
      if (itemToRemove) {
        const updatedAmount = productAmounts[id] + itemToRemove.quantity;
        setProductAmounts((prevAmounts) => ({ ...prevAmounts, [id]: updatedAmount }));
      }

      return currItems.filter((item) => item.id !== id);
    });
  }

  function updateProductAmount(id: number, newAmount: number) {
    setProductAmounts((prevAmounts) => ({ ...prevAmounts, [id]: newAmount }));
  }

  const getItemInfo = async (id: number): Promise<Item | null> => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching item info:', error);
      return null;
    }
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        updateProductAmount,
        getItemInfo, 
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        purchase
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}