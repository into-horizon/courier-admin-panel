import ApiService from "./ApiService";


export default class Update extends ApiService {
    constructor(){
        super();
        this.path = "api/v1/store";
    }

    async updateInfo(info){
        try {
            let response = await this.update(this.path, info, this.bearer( await this.token()) )
            return response
        } catch (error) {
            return error
        }
    }
    async updateStoreName(name){
        try {
            let response = await this.update(`${this.path}/name`,name,this.bearer(await this.token()))
            return response
            
        } catch (error) {
            return error
        }

    }

    async updateStorePicture(data){
        try {
            let response = await this.update(`${this.path}/picture`,data, {'Content-Type': 'multipart/form-data', ...this.bearer( await this.token())} )
            return response
        } catch (error) {
            return error
        }
    }
}