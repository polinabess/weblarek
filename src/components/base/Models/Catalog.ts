import type { IProduct } from "../../../types";

export class Catalog {
  private products: IProduct[];
  private selectedProduct: IProduct | null = null;

  constructor(initialProducts: IProduct[] = [], initialSelected?: IProduct) {
    this.products = initialProducts;
    if (initialSelected) {
      this.selectedProduct = initialSelected;
    }
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  saveSelectedProduct(product: IProduct): void {
    this.selectedProduct =  product;
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }

  saveProducts(newProducts: IProduct[]): void {
    this.products = newProducts;
  }

  getProductById(id: string): IProduct | undefined {
    return this.products.find(product => product.id === id);
  }
}