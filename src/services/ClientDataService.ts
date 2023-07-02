import http from '../http-common';

class ClientDataService {
    getAll(): Promise<any> {
      return http.get("/client/");
    }
    getLimit(limit: any): Promise<any> {
      return http.get(`/client/?limit=${limit}`);
    }
  
    get(id: any): Promise<any> {
      return http.get(`/client/${id}/`);
    }
  
    create(data: any): Promise<any> {
      return http.post("/client/", data);
    }
  
    update(id: any, data: any): Promise<any> {
      return http.put(`/client/${id}/`, data);
    }

    patch(id: any,data: any): Promise<any> {
      return http.patch(`/client/${id}/`, data);
    }
  
    delete(id: any): Promise<any> {
      return http.delete(`/client/${id}/`);
    }
  
    deleteAll(): Promise<any> {
      return http.delete(`/client/`);
    }
  
    findByTitle(title: String): Promise<any> {
      return http.get(`/client/?title=${title}`);
    }

    getBarangayVal(brgy: String): Promise<any> {
      return http.get(`/barangay/?jtb=1&val=${brgy}`);
    }
    getBarangay(): Promise<any> {
      return http.get(`/barangay/`);
    }
  }
  
  export default new ClientDataService();