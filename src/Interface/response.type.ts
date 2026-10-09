import { Category } from "./category.interface";
import { ListResponse } from "./listingResponse.interface";
import { Iproduct } from "./products.interface";
export type categoryResponse = ListResponse<Category>;
export type productsResponse = ListResponse<Iproduct>;
