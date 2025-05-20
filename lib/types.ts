export type Category = {
    category_id: number;
    name: string;
    isActing: boolean;
    isSong: boolean;
}

export type Movie = {
    imdb_id: string;
    title: string;
    poster: string;
    year: number;
}

export type Nomination = {
    nomination_id: number;
    year: number;
    category: Category;
    nominee: string;
    movie: Movie;
    user: string;
    didWin: boolean;
    user_id: number;
    votes: number;
}

export type User = {
    username: string;
    email: string;
    password: string;
    user_id: number;
}
