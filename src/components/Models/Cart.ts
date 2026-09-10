import type { IProduct } from "../../types";

export class Cart {
  private items: IProduct[] = [];

  addProduct(product: IProduct): void {
    this.items.push(product);
  }

  removeProduct(productId: string): void {
    this.items = this.items.filter(item => item.id !== productId);
  }

  getQuantity(): number {
    return this.items.length;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  calculateTotal(): number {
    return this.items.reduce((total, item) => {
      return total + (item.price ?? 0);
    }, 0);
  }
  
  hasProduct(productId: string): boolean {
    return this.items.some(item => item.id === productId);
  }
}