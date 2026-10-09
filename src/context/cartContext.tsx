"use client";

import { getCartProducts } from "@/app/services/cartAction/getProductCart.action";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type contextType = {
  cartNumber: number;
  setCartNumber: React.Dispatch<SetStateAction<number>>;
};
export const cartContext = createContext<contextType>({
  cartNumber: 0,
  setCartNumber: () => undefined,
});
export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartNumber, setCartNumber] = useState<number>(0);
  async function getCartPro() {
    const response = await getCartProducts();
    if (response.status == "success") {
      setCartNumber(response.numOfCartItems);
    }
  }
  useEffect(() => {
    getCartPro();
  }, []);
  return (
    <cartContext.Provider value={{ cartNumber, setCartNumber }}>
      {children}
    </cartContext.Provider>
  );
}
