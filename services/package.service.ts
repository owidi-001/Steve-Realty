import { AdvertisingPackage } from "@/types";
import { BaseService } from "./base.service";

class PackageService extends BaseService {
    constructor() {
        super('/agents/packages');
    }

    async getAll(): Promise<AdvertisingPackage[]> {
        const response = await this.list<AdvertisingPackage>();
        return response.results;
    }
}

export const packageService = new PackageService();

