import type {  IApi, IProductsResponse, IOrder, IOrderResponse } from '../../types';


export class WebLarekApi {
  private api: IApi

  constructor(api: IApi) {
    this.api = api;
  }

  getProducts(): Promise<IProductsResponse> {
      return this.api.get<IProductsResponse>('/product/')
  }

  createOrder(order: IOrder): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>('/order/', order);
  }
}