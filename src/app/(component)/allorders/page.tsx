"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  FiShoppingBag,
  FiCalendar,
  FiPackage,
  FiMapPin,
  FiChevronDown,
  FiCreditCard,
  FiTruck,
  FiClock,
  FiCheckCircle,
  FiShoppingCart,
  FiPhone,
  FiDollarSign,
  FiAlertCircle,
} from "react-icons/fi";
import { getUserProduct } from "@/app/services/getAllOrders.services";

interface OrderProduct {
  _id: string;
  count: number;
  price: number;
  product?: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
  };
}

interface Order {
  _id: string;
  id?: number;
  createdAt: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  cartItems: OrderProduct[];
  shippingAddress?: {
    city?: string;
    details?: string;
    phone?: string;
  };
}

export default function AllOrders() {
  const { data: session, status } = useSession();

  const userId = (session?.user as { id?: string } | undefined)?.id;

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" || !userId) {
      setLoading(false);
      setError("Please log in to view your orders.");
      return;
    }

    async function fetchOrders() {
      try {
        setLoading(true);
        setError("");

        const response = await getUserProduct(userId!);

        if (response?.message === "fail" || response?.status === "error") {
          throw new Error("Failed to load orders");
        }

        const result = response?.data;

        const ordersData = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response?.data?.orders)
              ? response.data.orders
              : [];

        setOrders(ordersData);
      } catch {
        setError("Something went wrong while loading your orders.");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [status, userId]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex items-center gap-3 text-green-700">
          <FiShoppingBag className="animate-pulse text-3xl" />
          <p className="font-semibold">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto my-16 max-w-3xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
        <FiAlertCircle className="mx-auto mb-4 text-4xl text-red-500" />

        <p className="text-lg font-semibold text-gray-800">{error}</p>

        <Link
          href="/Login"
          className="mt-5 inline-flex rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-3 text-sm">
          <Link
            href="/"
            className="text-gray-500 transition hover:text-green-600"
          >
            Home
          </Link>

          <span className="text-gray-300">/</span>

          <span className="font-medium text-gray-900">My Orders</span>
        </div>

        {/* Header */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl bg-green-600 text-3xl text-white shadow-lg shadow-green-100">
              <FiShoppingBag />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                My Orders
              </h1>

              <p className="mt-1 text-gray-500">
                Track and manage your {orders.length}{" "}
                {orders.length === 1 ? "order" : "orders"}
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-green-600 transition hover:text-green-700"
          >
            <FiShoppingCart className="text-lg" />
            Continue Shopping
          </Link>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <FiShoppingBag className="mx-auto mb-5 text-6xl text-gray-300" />

            <h2 className="text-2xl font-bold text-gray-800">No orders yet</h2>

            <p className="mt-2 text-gray-500">
              Your orders will appear here after you place an order.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-7 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              <FiShoppingCart />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const items = order.cartItems ?? [];
              const firstItem = items[0];
              const product = firstItem?.product;

              const totalItems = items.reduce(
                (total, item) => total + (item.count || 0),
                0,
              );

              const statusLabel = order.isDelivered
                ? "Delivered"
                : order.isPaid
                  ? "Processing"
                  : "Pending Payment";

              const statusStyle = order.isDelivered
                ? "bg-green-100 text-green-700"
                : order.isPaid
                  ? "bg-amber-100 text-amber-700"
                  : "bg-orange-100 text-orange-700";

              const StatusIcon = order.isDelivered
                ? FiCheckCircle
                : order.isPaid
                  ? FiClock
                  : FiAlertCircle;

              return (
                <details
                  key={order._id}
                  className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Order Card Header */}
                  <summary className="flex cursor-pointer list-none flex-wrap items-center gap-5 p-5 md:p-8">
                    {/* Product Image */}
                    <div className="relative flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-3">
                      {product?.imageCover ? (
                        <img
                          src={product.imageCover}
                          alt={product.title || "Order product"}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <FiPackage className="text-5xl text-gray-300" />
                      )}

                      {items.length > 1 && (
                        <span className="absolute right-1 top-1 rounded-full bg-gray-900 px-2 py-1 text-xs font-bold text-white">
                          +{items.length - 1}
                        </span>
                      )}
                    </div>

                    {/* Order Info */}
                    <div className="min-w-0 flex-1">
                      <span
                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold ${statusStyle}`}
                      >
                        <StatusIcon />
                        {statusLabel}
                      </span>

                      <h2 className="mt-3 text-xl font-bold text-gray-900">
                        # {order.id ?? order._id?.slice(-6)}
                      </h2>

                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <FiCalendar className="text-gray-400" />

                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )
                            : "Date unavailable"}
                        </span>

                        <span className="text-gray-300">•</span>

                        <span className="flex items-center gap-2">
                          <FiPackage className="text-gray-400" />
                          {totalItems} items
                        </span>

                        <span className="text-gray-300">•</span>

                        <span className="flex items-center gap-2">
                          <FiMapPin className="text-gray-400" />
                          {order.shippingAddress?.city || "Address unavailable"}
                        </span>
                      </div>

                      <p className="mt-4 text-2xl font-bold text-gray-900">
                        {order.totalOrderPrice?.toLocaleString("en-US")}{" "}
                        <span className="text-sm font-medium text-gray-400">
                          EGP
                        </span>
                      </p>
                    </div>

                    {/* Payment Icon */}
                    <div
                      className={`hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl sm:flex ${
                        order.paymentMethodType === "card"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.paymentMethodType === "card" ? (
                        <FiCreditCard className="text-2xl" />
                      ) : (
                        <FiDollarSign className="text-2xl" />
                      )}
                    </div>

                    {/* Details Button */}
                    <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-5 py-3 font-medium text-gray-700 transition group-open:bg-green-50 group-open:text-green-700">
                      Details
                      <FiChevronDown className="transition-transform group-open:rotate-180" />
                    </div>
                  </summary>

                  {/* Expanded Details */}
                  <div className="border-t border-green-100 bg-white p-5 md:p-8">
                    <h3 className="mb-5 flex items-center gap-2 font-bold text-gray-900">
                      <FiPackage className="text-lg text-green-600" />
                      Order Items
                    </h3>

                    {/* Products */}
                    <div className="space-y-3">
                      {items.map((item, index) => {
                        const unitPrice =
                          item.price ?? item.product?.price ?? 0;

                        return (
                          <div
                            key={item._id || `${order._id}-${index}`}
                            className="flex flex-wrap items-center gap-4 rounded-2xl border border-gray-100 p-4"
                          >
                            {item.product?.imageCover ? (
                              <img
                                src={item.product.imageCover}
                                alt={item.product.title || "Product"}
                                className="h-16 w-16 rounded-xl bg-gray-50 object-contain p-1"
                              />
                            ) : (
                              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-50">
                                <FiPackage className="text-2xl text-gray-300" />
                              </div>
                            )}

                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-gray-800">
                                {item.product?.title || "Product"}
                              </p>

                              <p className="mt-1 text-sm text-gray-500">
                                {item.count} ×{" "}
                                {unitPrice.toLocaleString("en-US")} EGP
                              </p>
                            </div>

                            <p className="font-bold text-gray-900">
                              {(unitPrice * (item.count || 0)).toLocaleString(
                                "en-US",
                              )}{" "}
                              EGP
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Address & Summary */}
                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                      {/* Delivery Address */}
                      <div className="rounded-2xl border border-gray-200 p-5">
                        <h3 className="mb-4 flex items-center gap-2 font-bold text-gray-900">
                          <FiMapPin className="text-lg text-blue-500" />
                          Delivery Address
                        </h3>

                        <p className="font-medium text-gray-700">
                          {order.shippingAddress?.city || "Not available"}
                        </p>

                        <p className="mt-2 break-words text-sm text-gray-500">
                          {order.shippingAddress?.details ||
                            "No address details"}
                        </p>

                        <p className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                          <FiPhone className="text-gray-400" />
                          {order.shippingAddress?.phone || "No phone number"}
                        </p>
                      </div>

                      {/* Order Summary */}
                      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                        <h3 className="mb-4 flex items-center gap-2 font-bold text-gray-900">
                          <FiClock className="text-lg text-amber-600" />
                          Order Summary
                        </h3>

                        <div className="flex justify-between gap-3 text-sm text-gray-600">
                          <span>Subtotal</span>

                          <span>
                            {order.totalOrderPrice?.toLocaleString("en-US")} EGP
                          </span>
                        </div>

                        <div className="my-3 flex justify-between gap-3 text-sm text-gray-600">
                          <span>Shipping</span>
                          <span>Included in total</span>
                        </div>

                        <div className="mt-4 flex justify-between gap-3 border-t border-amber-200 pt-4 font-bold text-gray-900">
                          <span>Total</span>

                          <span>
                            {order.totalOrderPrice?.toLocaleString("en-US")} EGP
                          </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3 text-sm text-gray-600">
                          <span>Payment Method</span>

                          <span className="font-semibold capitalize">
                            {order.paymentMethodType || "Not available"}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3 text-sm text-gray-600">
                          <span>Payment Status</span>

                          <span
                            className={`font-semibold ${
                              order.isPaid
                                ? "text-green-700"
                                : "text-orange-600"
                            }`}
                          >
                            {order.isPaid ? "Paid" : "Not Paid"}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3 text-sm text-gray-600">
                          <span>Delivery Status</span>

                          <span className="flex items-center gap-2 font-semibold">
                            <FiTruck />
                            {order.isDelivered ? "Delivered" : "Not Delivered"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
