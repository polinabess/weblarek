import type { IApi, IProduct, IBuyer } from '../../types';


export class WebLarekApi {
  private api: IApi

  constructor(api: IApi) {
    this.api = api;
  }

  getProducts(): Promise<IProduct[]> {
        return this.api
        .get<{ total: number; items: IProduct[] }>('/api/weblarek/product/')
        .then((response: { total: number; items: IProduct[] }) => response.items);
    }

  createOrder(
    order: IBuyer & { items: string[]; total: number }
  ): Promise<{ id: string; total: number }> {
    return this.api.post<{ id: string; total: number }>('/api/weblarek/order/', order);
  }
}