import { ListingPayment } from "@/types";
import { BaseService } from "./base.service";

class PaymentService extends BaseService {
    constructor() {
        super('/agents/payments');
    }

    async getMyPayments(): Promise<ListingPayment[]> {
        return this.get<ListingPayment[]>('/my_payments/');
    }

    async makePayment(
        paymentId: string,
        paymentMethod: string,
        paymentReference: string
    ): Promise<ListingPayment> {
        return this.post<ListingPayment>(`/${paymentId}/make_payment/`, {
            payment_method: paymentMethod,
            payment_reference: paymentReference,
        });
    }
}

export const paymentService = new PaymentService();

