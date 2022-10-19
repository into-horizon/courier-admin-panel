import ApiService from "./ApiService";

 class CategoryService extends ApiService {
    constructor() {
        super();
        this.path = "api/v1";
    }

    async getAllParentCategoires(limit = 10, offset = 0) {

        try {
            let res = await this.get(`${this.path}/getAll/PG`, { offset: offset, limit: limit });
            return res;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getAllChildCategoires(limit = 10, offset = 0) {

        try {
            let res = await this.get(`${this.path}/getAll/CG`, { offset: offset, limit: limit });
            return res;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getAllGrandChildCategoires(limit = 10, offset = 0) {

        try {
            let res = await this.get(`${this.path}/getAll/GCG`, { offset: offset, limit: limit });
            return res;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addGrandChildCategory(data) {
        try {
            let res = this.post(`${this.path}/add/GCG`, data, this.bearer(this.access_token()))
            return res.data
        } catch (error) {
            throw new Error(error.message);

        }
    }
}

const Category = new CategoryService()
export default Category;