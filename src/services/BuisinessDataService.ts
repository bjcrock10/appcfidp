import http from '../http-common';

class BusinessDataService {
    getAll(): Promise<any> {
      return http.get("/business/");
    }
    getLimit(limit: any): Promise<any> {
      return http.get(`/business/?limit=${limit}`);
    }
  
    get(id: any): Promise<any> {
      return http.get(`/business/?id=${id}`);
    }
  
    create(data: any): Promise<any> {
      return http.post("/business/", data);
    }
  
    update(id: any, data: any): Promise<any> {
      return http.put(`/business/${id}/`, data);
    }

    patch(id: any,data: any): Promise<any> {
      return http.patch(`/business/${id}/`, data);
    }
  
    delete(id: any): Promise<any> {
      return http.delete(`/business/${id}/`);
    }
  
    deleteAll(): Promise<any> {
      return http.delete(`/business/`);
    }
  
    findByLname(lname: String): Promise<any> {
      return http.get(`/business/?lname=${lname}`);
    }
    //Social Media Platform-------------------------------------------
    getAllSocial(): Promise<any> {
      return http.get('/socialmedia/')
    }
    getSocial(id: any): Promise<any> {
      return http.get(`/socialmedia/?id=${id}`);
    }
    getSocialByBusiness(id: any): Promise<any> {
      return http.get(`/socialmedia/?bid=${id}`);
    }
    createSocial(data: any): Promise<any> {
      return http.post("/socialmedia/", data);
    }
  
    updateSocial(id: any, data: any): Promise<any> {
      return http.put(`/socialmedia/${id}/`, data);
    }

    patchSocial(id: any,data: any): Promise<any> {
      return http.patch(`/socialmedia/${id}/`, data);
    }
  
    deleteSocial(id: any): Promise<any> {
      return http.delete(`/socialmedia/${id}/`);
    }
    //Ecommerce Platform-------------------------------------------
    getAllEcommerce(): Promise<any> {
      return http.get('/ecommerce/')
    }
    getEcommerce(id: any): Promise<any> {
      return http.get(`/ecommerce/?id=${id}`);
    }
    createEcommerce(data: any): Promise<any> {
      return http.post("/ecommerce/", data);
    }
  
    updateEcommerce(id: any, data: any): Promise<any> {
      return http.put(`/ecommerce/${id}/`, data);
    }

    patchEcommerce(id: any,data: any): Promise<any> {
      return http.patch(`/ecommerce/${id}/`, data);
    }
  
    deleteEcommerce(id: any): Promise<any> {
      return http.delete(`/ecommerce/${id}/`);
    }
    //Business Owner-------------------------------------------
    getAllOwner(): Promise<any> {
      return http.get('/ecommerce/')
    }
    getOwner(id: any): Promise<any> {
      return http.get(`/ecommerce/?id=${id}`);
    }
    createOwner(data: any): Promise<any> {
      return http.post("/ecommerce/", data);
    }
  
    updateOwner(id: any, data: any): Promise<any> {
      return http.put(`/ecommerce/${id}/`, data);
    }

    patchOwner(id: any,data: any): Promise<any> {
      return http.patch(`/ecommerce/${id}/`, data);
    }
  
    deleteOwner(id: any): Promise<any> {
      return http.delete(`/ecommerce/${id}/`);
    }
  }
  
  export default new BusinessDataService();