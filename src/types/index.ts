export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type TPayment = 'cash' | 'card';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  payment: TPayment | null;
  email: string | null;
  phone: string | null;
  address: string | null;
}


export interface IProductsResponse {
  total: number;
  items: IProduct[];
}


export interface IOrder extends IBuyer {
  items: string[];
  total: number;
}


export interface IOrderResponse {
  id: string;
  total: number;
}

export type IBuyerErrors = Partial<Record<keyof IBuyer, string>>;