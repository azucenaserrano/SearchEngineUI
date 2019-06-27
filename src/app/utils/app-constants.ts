import { environment } from './../../environments/environment';

export class AppConst {
    private static appurl = environment.apiUrl;

    public static getLocations(): string {
        return `${this.appurl}/locations`;
    }

    public static getCategories(): string {
        return `${this.appurl}/categories`;
    }

    public static getPlaces(): string {
        return `${this.appurl}/places`;
    }
}