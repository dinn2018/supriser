import { Anime, AnimeSeries } from '@/models/anime';
import { HOSTURL } from '@/config/config';
class HTTP {
    static async get(context: Vue, path: string, data?: Record<string, any>) {
        const res = await context.$http.get(`${HOSTURL}${path}`, { params: data });
        const json = await res.json();
        return json.data;
    }
    static async post(context: Vue, path: string, data?: Record<string, any>) {
        const res = await context.$http.post(`${HOSTURL}${path}`, data);
        const json = await res.json();
        return json.data;
    }
}

export default class AnimeAPI {
    static async getAnime(context: Vue, id: number): Promise<Anime> {
        return HTTP.get(context, `/animes/${id}`);
    }
    static async list(context: Vue, pageSize: number, pageNum: number, keyword: string, postYears: string[] = [], regions: string[] = []) {
        return HTTP.post(context, `/animes?pageSize=${pageSize}&pageNum=${pageNum}&keyword=${keyword}`, {
            regions: regions,
            postYears: postYears,
        });
    }

    static async seriesList(context: Vue, pageSize: number, pageNum: number, animeID: number, orderUp: boolean | undefined): Promise<any> {
        return HTTP.get(context, `/animes/${animeID}/series`, {
            pageSize: pageSize,
            pageNum: pageNum,
            order: orderUp ? 0 : 1,
        });
    }

    static async series(context: Vue, seriesID: number): Promise<AnimeSeries> {
        return HTTP.get(context, `/animes/series/${seriesID}`);
    }

    static async animeCategories(context: Vue): Promise<any> {
        return HTTP.get(context, `/animes/categories`);
    }

}