import Config from "../Config";

export const BASE_URL = `http://192.168.0.100:8080/api`
export const IMDB_URL = `https://www.imdb.com/title`
export const DOUBAN_URL = `https://movie.douban.com/subject`

export const getPopularMoviesUrl = ({ start = 0 }) => `${withBase('/movie/popular')}?start=${start}`
export const getTrendingMoviesUrl = ({ start = 0 }) => `${withBase('/movie/trending')}?start=${start}`
export const getRandomMoviesUrl = ({ start = 0 }) => `${withBase('/movie/random')}?seed=${Config.seed}&start=${start}`
export const getLatestMoviesUrl = ({ start = 0 }) => `${withBase('/movie/latest')}?start=${start}`
export const getSearchMoviesUrl = ({ start = 0, query}) => `${withBase('/movie/search')}?start=${start}&title=${encodeURIComponent(query)}`
export const getCategoryListUrl = ({ start = 0, genre, region, pubYear, sort}) => `${withBase('/movie/category')}?start=${start}&genre=${genre}&region=${region}&pub_year=${pubYear}&sort=${sort}`
export const getIMDbLink = (imdb_id) => `${IMDB_URL}/${imdb_id}`
export const getDoubanLink = (douban_id) => `${DOUBAN_URL}/${douban_id}`
export const getMovieListUrl = () => `${withBase('/movie/list')}`
export const getMovieEnumUrl = () => `${withBase('/movie/enum')}`

function withBase(path) {
    return `${BASE_URL}${path}`
}