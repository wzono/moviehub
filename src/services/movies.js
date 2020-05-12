import axios from 'axios'
import {
  getCategoryListUrl,
  getMovieDetailUrl,
  getMovieEnumUrl,
  getMovieListUrl,
  getReviewsUrl,
  getSearchMoviesUrl,
  getMovieReviewDetailUrl
} from "./urls";
import Config from "../Config";
import { parseMoviesArray } from "../utils/movies";

export const FAVORITES_KEY = 'Favorites'

export const getSectionFetchFunctionFromUrlGetter = urlGetter => (params, reqParams) =>
  fetchSectionMovies(urlGetter, params, reqParams);

export const getSearchFetchFunctionFromQuery = query => ({ start }) =>
  fetchSearchMovies({ start, query });

export const getCategoryFetchFunctionFromSelect = (select) => ({ start }) => fetchCategoryList(select, { start })

export const getReviewFetchFunctionFromId = (id) => ({ start }) => fetchMovieReviews(id, { start })

export function fetchMovieDetail(id) {
  return new Promise(async (resolve, reject) => {
    const url = getMovieDetailUrl({ id })
    try {
      const { data } = await axios.get(url)
      const body = await getBody(data)
      resolve(body)
    } catch (err) {
      reject(err)
    }
  })
}

export function fetchMovieReviews(id, { start }) {
  return new Promise(async (resolve, reject) => {
    const url = getReviewsUrl({ id, start })
    try {
      const { data } = await axios.get(url)
      const body = await getBody(data)
      resolve(body)
    } catch (err) {
      reject(err)
    }
  })
}

export function fetchMovieReviewDetail(id) {
  return new Promise(async (resolve, reject) => {
    const url = getMovieReviewDetailUrl({ id })
    try {
      const { data } = await axios.get(url)
      const body = await getBody(data)
      resolve(body)
    } catch (err) {
      reject(err)
    }
  })
}

export function fetchCategoryList(select, { start }) {
  return new Promise(async (resolve, reject) => {
    const url = getCategoryListUrl({ ...select, start })
    try {
      const { data } = await axios.get(url);
      const body = await getBody(data)
      addParsedMoviesToData(body)
      resolve(body);
    } catch (error) {
      reject(error);
    }
  })
}

export function fetchMovieEnum() {
  return new Promise(async (resolve, reject) => {
    try {
      const url = getMovieEnumUrl()
      const { data } = await axios.get(url)
      const body = await getBody(data)
      resolve(body)
    } catch (err) {
      reject(err)
    }
  })
}

export function fetchSectionMovies(urlGetter, { start }, params) {
  return new Promise(async (resolve, reject) => {
    const url = urlGetter({ start: start || 0 });
    try {

      const { data } = await axios.get(url, params);
      const body = await getBody(data)
      addParsedMoviesToData(body)
      resolve(body);
    } catch (error) {
      reject(error);
    }
  })
}

export function fetchSearchMovies({ start, query }, params = {}) {
  return new Promise(async (resolve, reject) => {
    const url = getSearchMoviesUrl({ start, query });
    try {
      const { data } = await axios.get(url, params);
      const body = await getBody(data)
      addParsedMoviesToData(body);
      resolve(body);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });
}

export function add2Favorites(movieId) {
  return Storage.save({
    key: FAVORITES_KEY,
    id: movieId,
    data: {
      id: movieId,
      createdAt: new Date()
    }
  })
}

export function removeFromFavorites(movieId) {
  return Storage.remove({
    key: FAVORITES_KEY,
    id: movieId
  })
}

export function getFavoritesIds() {
  return Storage.getIdsForKey(FAVORITES_KEY)
}

export function getFavoritesData() {
  return Storage.getAllDataForKey(FAVORITES_KEY)
}

export function isInFavorites(movieId) {
  return new Promise(async (resolve, reject) => {
    try {
      const ids = await getFavoritesIds()
      resolve(ids.includes(movieId))
    } catch (err) {
      reject(err)
    }
  })
}

export function getFavorites() {
  return new Promise(async (resolve, reject) => {
    try {
      const favorites = await getFavoritesData()
      const data = parseFavoritesToData(favorites)
      const movies = await fetchMovieByIds([...data.keys()]) || []
      const sortedMovies = sortFavoritesByCreatedTime(movies, data)
      resolve(sortedMovies)
    } catch (err) {
      reject(err)
    }
  })
}

export function fetchMovieByIds(ids = []) {
  return new Promise(async (resolve, reject) => {
    ids = Array.isArray(ids) ? ids : [ids]
    ids = ids.map(id => id + '')

    try {
      const url = getMovieListUrl()
      const { data } = await axios({ url, method: 'post', data: { ids } })
      const body = await getBody(data)
      resolve(body)
    } catch (err) {
      reject(err)
    }
  })
}


function addParsedMoviesToData(data) {
  data.movies = parseMoviesArray(data.subjects || [])
}

function getBody(data = {}) {
  return new Promise((resolve, reject) => {
    const { code, message, data: body } = data
    if (code > 0) {
      reject(new Error(message))
    } else {
      resolve(body)
    }
  })
}

function parseFavoritesToData(favorites = []) {
  return favorites.reduce((acc, cur) => {
    acc.set(cur.id, cur.createdAt)
    return acc
  }, new Map())
}

function sortFavoritesByCreatedTime(movies = [], data = {}) {
  return movies.map(movie => {
    movie.createdAt = new Date(data.get(movie.id))
    return movie
  }).sort((a, b) => b.createdAt - a.createdAt)
}

