import type { IBuyer } from "../../../types";

import type { TPayment } from "../../../types";

export class Buyer {
  private payment: TPayment | null = null;
  private email: string | null = null;
  private phone: string | null = null;
  private address: string | null = null;

  setPayment(payment: TPayment): void {
    this.payment = payment;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    }
  }

  clearData(): void {
    this.payment = null;
    this.email = null;
    this.phone = null;
    this.address = null;
  }

  validate(): Record<string, string> | {} {
    const errors: Record<string, string> = {};
    if (!this.payment) {
      errors.payment = 'Не выбран вид оплаты';
    }
    if (!this.email) {
      errors.email = 'Укажите email';
    }
    if (!this.phone) {
      errors.phone = 'Укажите номер телефона';
    }
    if (!this.address) {
      errors.address = 'Укажите адрес доставки';
    }

    return errors;
  }
}