interface AnimeSeries {
    id: number,
    url: string;
    num: number;
    animeID: number;
}

interface Anime {
    id: number;
    name: string;
    director: string;
    poster: string;
    region: string;
    lang: string;
    description: string;
    status: string;
    updateTime: number;
}


// class Novel extends Media {
//     public content: string;
//     public region: string;
//     constructor(
//         name: string,
//         imageURL: string,
//         description: string,
//         postYear: number,
//         content: string,
//         region: string,
//     ) {
//         super(name, imageURL, description, postYear);
//         this.region = region;
//         this.content = content;
//     }

// }

export { AnimeSeries, Anime };