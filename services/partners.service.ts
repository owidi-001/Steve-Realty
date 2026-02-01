import { BaseService } from "./base.service";

class PartnerService extends BaseService {
    constructor() {
        super('/common/partners');
    }
}

export const partnerService = new PartnerService();

