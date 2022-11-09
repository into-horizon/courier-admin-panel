import ApiService from "./ApiService";

class Courier extends ApiService {
    constructor() {
        super();
        this.path = "api/v1/courierCompany"
        this.path2 = "api/v1/courier"
    }
    async addCourier(data) {
        try {
            let result = await this.post(this.path2, data)
            console.log("🚀 ~ file: Courier.js ~ line 12 ~ Courier ~ addCourier ~ result", result)
            return result
        } catch (error) {
            return error
        }
    }

    async getCouriers(data) {
        try {
            let result = await this.get('api/v1/companyCouriers', data)
            return result
        } catch (error) {
            return error
        }
    }
    async removeCourier(data) {
        try {
            let result = await this.delete(`${this.path2}/remove`, {id:data});
            return result
        } catch (error) {
            return error
        }
    }
    async updateStatus(data){
        try {
            
            let result = await this.update(`${this.path2}`, data);
            return result
        } catch (error) {
            return error
        }
    }

}

export default new Courier()