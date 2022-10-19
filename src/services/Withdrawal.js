import ApiService from "./ApiService";


class Withdrawal extends ApiService {
    constructor() {
        super();
        this.path = "api/v1/withdrawal/store"
    }

    async getWithdrawals(payload) {
        try {
            let result = await this.get(this.path,payload)
            return result
        } catch (error) {
            return error
        }
    }
    async addWithdrawal(data) {
        try {
            let result = await this.post(this.path, data)
            return result
        } catch (error) {
            return error
        }

    }
}

export default new Withdrawal()