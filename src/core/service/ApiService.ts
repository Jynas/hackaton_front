import type { App } from 'vue';
import axios from "axios";
import VueAxios from "vue-axios";
import type { AxiosResponse } from "axios";
import JwtService from "@/core/service/JwtService";

class ApiService {
  public static vueInstance: App;

  public static init(app: App<Element>):void {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
  }

  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common['Authorization'] = `Bearer ${JwtService.getToken()}`;
    ApiService.vueInstance.axios.defaults.headers.common['Accept'] =
      'application/json;charset=utf-8';
  }


  public static query(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  public static get(resource: string, slug = '' as string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios
      .get(`${resource}${slug ? '/' + slug : ''}`);
  }

  public static post(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }

  public static update(resource: string, slug: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios
      .put(`${resource}${slug ? '/' + slug : ''}`, params);
  }

  public static put(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  public static delete(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource);
  }
}

export default ApiService
