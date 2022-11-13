import ApiService from "./ApiService";

class Tasks extends ApiService {
    constructor() {
        super();
        this.path= 'api/v1/deliveryTask'
    }

    async availableTasks(payload){
        try {
            let data = await this.get(`${this.path}/unassigned`,payload)
            return data
        } catch (error) {
            return error
        }
    }
    async takeoverTask(id) {
        try {
            let result = await this.update(`${this.path}/companyId`,{id:id});
            return result
        } catch (error) {
            return error
        }
    }
    async unassignedTasks(payload){
        try {
            let data = await this.get(`${this.path}/companyUnassigned`,payload)
            return data
        } catch (error) {
            return error
        }
    }
    async assignCourier(data) {
        try {
            let result = await this.update(`${this.path}/courierId`,data);
            return result
        } catch (error) {
            return error
        }
    }
    async tasksOverview(payload){
        try {
            let data = await this.get(`${this.path}/overview`,payload)
            return data
        } catch (error) {
            return error
        }
    }
    async bulkReassignCourier(data) {
        try {
            let result = await this.update(`${this.path}/bulkReassign`,data);
            return result
        } catch (error) {
            return error
        }
       
    }
    async bulkUpdateStatus(data) {
        try {
            let result = await this.update(`${this.path}/bulkStatus`,data);
            return result
        } catch (error) {
            return error
        }
    }
}

export default new Tasks()