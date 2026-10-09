"use client";
import ProductTable from "@/app/_SharedComponent/productTable/productTable";
import { clearProducts } from "@/app/services/cartAction/clearProductCart.action";
import { deleteProducts } from "@/app/services/cartAction/deleteProductCart.action";
import { getCartProducts } from "@/app/services/cartAction/getProductCart.action";
import { updateProducts } from "@/app/services/cartAction/updateProductCart.action";
import { toast } from "@/components/ui/toast";
import { cartContext } from "@/context/cartContext";
import { cartProduct, Product } from "@/Interface/cartProduct.interface";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Cart() {
  const { setCartNumber } = useContext(cartContext);
  const [cartList, setList] = useState<cartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState<string>("");

  async function getProducts() {
    try {
      const response = await getCartProducts();
      if (response && response.data && response.data.products) {
        setList(response.data.products);
        setTotalPrice(response.data.totalCartPrice);
        setCartNumber(response.numOfCartItems);
        setCartId(response.cartId);
      }
    } catch (error) {
      throw new Error("Failed ");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);
  async function removeItem(productId: string) {
    const response = await deleteProducts(productId);
    if (response.status == "success") {
      setList(response.data.products ?? []);
      setTotalPrice(response.data.totalCartPrice);
      setCartNumber(response.numOfCartItems);
      toast.add({
        title: "Success",
        description: "Product deleted successfully...!",
      });
    } else {
      toast.add({
        title: "Field",
        description: "there is an error...!",
      });
    }
  }
  async function clearCart() {
    const response = await clearProducts();
    if (response.message == "success") {
      getProducts();
      toast.add({
        title: "Success",
        description: "Products deleted successfully...!",
      });
      setCartNumber(response.numOfCartItems);
    } else {
      toast.add({
        title: "Field",
        description: "there is an error...!",
      });
    }
  }
  async function updateCount(productId: string, count: number) {
    const response = await updateProducts(productId, count);
    if (response.status == "success") {
      setList(response.data.products ?? []);
      setTotalPrice(response.data.totalCartPrice);

      toast.add({
        title: "Success",
        description: "Product updated successfully...!",
      });
      setCartNumber(response.numOfCartItems);
    } else {
      toast.add({
        title: "Field",
        description: "there is an error...!",
      });
    }
  }

  return (
    <div className="container w-[95%] md:w-[90%] mx-auto py-10 md:p10-20">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-y-8  md:gap-x-5">
        {cartList.length > 0 ? (
          <>
            <div className="md:col-span-7 overflow-x-auto">
              <button
                onClick={() => {
                  clearCart();
                }}
                className="text-white bg-red-600 my-4 px-4 py-3 rounded-md"
              >
                Clear
              </button>
              <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                <table className="w-full text-sm text-left rtl:text-right text-body">
                  <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        <span className="sr-only">Image</span>
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Qty
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <ProductTable
                      cartList={cartList}
                      onRemove={removeItem}
                      onUpdateCount={updateCount}
                    />
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="border border-slate-200 bg-slate-200 shadow-xl rounded-md p-10">
                <h3 className="text-3xl font-bold my-5 text-green-700 ">
                  {" "}
                  Total Price:
                </h3>
                <span className="font-bold text-2xl">{totalPrice} Egp</span>
                <div className="grid md:grid-cols-2 pt-5 gap-x-5">
                  <Link href={`/checkOut/${cartId}`}>
                    <button className="bg-green-700 text-slate-200 px-3 py-2 rounded-md mb-2 md:mb-0">
                      With Payment
                    </button>
                  </Link>
                  <Link href={`/cashOrder/${cartId}`}>
                    <button className="bg-green-700 text-slate-200 px-3 py-2 rounded-md">
                      Pay OnDlivery
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="col-span-10">
            {" "}
            <h3 className="text-6xl font-bold text-green-100 text-center py-10">
              The Card Is Empty.....
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
