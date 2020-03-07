import { Anime, AnimeSeries } from '@/models/anime';
import { HOSTURL } from '@/config/config';
class API {
    static async get(context: Vue, path: string) {
        const res = await context.$http.get(`${HOSTURL}${path}`);
        const json = await res.json();
        return json.data;
    }
}

export default class AnimeAPI {
    static async get(context: Vue, id: number): Promise<Anime> {
        return API.get(context, `/animes/${id}`);
    }
    static async list(context: Vue, pageSize: number, pageNum: number, keyword: string): Promise<Array<Anime>> {
        return API.get(context, `/animes?page_size=${pageSize}&page_num=${pageNum}&keyword=${keyword}`);
    }

    static async count(context: Vue): Promise<number> {
        return API.get(context, `/animes/count`)
    }
    static async seriesList(context: Vue, animeID: number): Promise<Array<AnimeSeries>> {
        return API.get(context, `/animes/${animeID}/series`);
    }

    static async series(context: Vue, seriesID: number): Promise<AnimeSeries> {
        return API.get(context, `/animes/series/${seriesID}`);
    }
}