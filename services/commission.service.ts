import { Commission } from "@/types";
import { BaseService } from "./base.service";

class CommissionService extends BaseService {
    constructor() {
        super('/agents/commissions');
    }

    async getMyCommissions(): Promise<Commission[]> {
        return this.get<Commission[]>('/my_commissions/');
    }
}

export const commissionService = new CommissionService();

