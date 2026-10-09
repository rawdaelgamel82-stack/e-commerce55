interface Checkout {
  city: string;
  phone: string;
  details: string;
}
interface checkOrder extends Checkout {
  postalCode: string;
}
