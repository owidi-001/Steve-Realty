import { Inquiry } from "@/types";
import { BaseService } from "./base.service";

class InquiryService extends BaseService {
    constructor() {
        super('/inquiries');
    }

    async submit(data: Partial<Inquiry>): Promise<Inquiry> {
        return this.create<Inquiry>(data);
    }
}

export const inquiryService = new InquiryService();

