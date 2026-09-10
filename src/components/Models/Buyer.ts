import type { IBuyer, TPayment, IBuyerErrors } from "../../types";


export class Buyer {
  private payment: TPayment | null = null;
  private email: string = '';
  private phone: string = '';
  private address: string = '';

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
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  validate(): IBuyerErrors {
    const errors: IBuyerErrors = {};

    if (!this.payment) {
      errors.payment = 'Не выбран вид оплаты';
    }

    const emailTrimmed = this.email.trim();
    if (!emailTrimmed) {
      errors.email = 'Укажите email';
    }

    const phoneTrimmed = this.phone.trim();
    if (!phoneTrimmed) {
      errors.phone = 'Укажите номер телефона';
    }

    const addressTrimmed = this.address.trim();
    if (!addressTrimmed) {
      errors.address = 'Укажите адрес доставки';
    }

    return errors;
  }
}