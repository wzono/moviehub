import Config from "../Config";

export const SORT = {
    Trending: "3",
    Popular: "2",
    Latest: "0",
    Highest: "1",
}

export const BASE_URL = `http://192.168.0.104:8080/v1/api`
export const IMDB_URL = `https://www.imdb.com/title`
export const DOUBAN_URL = `https://movie.douban.com/subject`

export const getPopularMoviesUrl = ({ start = 0 }) => `${withBase('/movie/list/type')}?start=${start}&sort=${SORT.Popular}`
export const getTrendingMoviesUrl = ({ start = 0 }) => `${withBase('/movie/list/type')}?start=${start}&sort=${SORT.Trending}`
export const getRandomMoviesUrl = ({ start = 0 }) => `${withBase('/movie/list/random')}?seed=${Config.seed}&start=${start}`
export const getLatestMoviesUrl = ({ start = 0 }) => `${withBase('/movie/list/type')}?start=${start}&sort=${SORT.Latest}`
export const getSearchMoviesUrl = ({ start = 0, query }) => `${withBase('/movie/list/search')}?start=${start}&q=${encodeURIComponent(query)}`
export const getCategoryListUrl = ({ start = 0, genres, regions, pubYears, sort }) => `${withBase('/movie/list/type')}?start=${start}&genres=${genres}&regions=${regions}&pub_years=${pubYears}&sort=${sort}`


export const getIMDbLink = (imdb_id) => `${IMDB_URL}/${imdb_id}`
export const getDoubanLink = (douban_id) => `${DOUBAN_URL}/${douban_id}`
export const getMovieListUrl = () => `${withBase('/movie/list/ids')}`
export const getMovieEnumUrl = () => `${withBase('/constants')}`
export const getMovieDetailUrl = ({ id }) => `${withBase('/movie')}?id=${id}`


export const getReviewsUrl = ({ start, id }) => `${withBase('/movie/review/list')}?start=${start}&id=${id}`
function withBase(path) {
    return `${BASE_URL}${path}`
}