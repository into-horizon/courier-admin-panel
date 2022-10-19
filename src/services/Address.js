import ApiService from "./ApiService";

class Address extends ApiService {
    constructor() {
        super();
        this.path = "api/v1/address";
    }
    xpath(x) {
        return `api/v1/${x}/address`
    }

    async addAddress(data) {
        try {
            let result = await this.post(this.xpath('add'), data, this.bearer(await this.token()))
            return result
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteAddress(id) {
        try {
            let result = await this.update(this.xpath('remove'), {id: id}, this.bearer(await this.token()))
            return result;

        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getAddress(){
        try {
            let result = await this.get(`${this.path}/store`, null, this.bearer(await this.token()))
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async updateAddress(data){
        try {
            let result = await this.update(this.xpath('update'), data, this.bearer(await this.token()))
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new Address();
