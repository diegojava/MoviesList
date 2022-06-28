export interface Movie {
    id: string;
    name: string;
    image: any;
    summary: string;
    officialSite: string;
    premiered: string;
    ended?: string;
    rating: any;
    genres: Genre[];
    isFavorite?: boolean;
}

interface Genre {
    genre: string
}

