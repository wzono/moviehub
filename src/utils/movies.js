export const movieKeyExtractor = movie => movie.id.toString();
export const reviewKeyExtractor = review => review.id.toString();

export const parseMoviesArray = (movies = []) =>
  movies.filter(movie => isEnoughInfo(movie))

export const filterDuplicateMovies = movies =>
  movies.filter(
    (movie, index) =>
      index === movies.findIndex(m => movieKeyExtractor(m) === movieKeyExtractor(movie))
  );

export const filterDuplicateReviews = reviews =>
  reviews.filter(
    (review, index) => index === reviews.findIndex(r => reviewKeyExtractor(r) === reviewKeyExtractor(review))
  )

export const parseReleaseDate = (date) => {
  const d = new Date(date)
  return `${d.getFullYear()}-${parseDigit(d.getMonth() + 1)}-${parseDigit(d.getDate())}`
}


// Local functions

const movieRequiredProps = ['pub_year', 'title', 'cover'];
const isEnoughInfo = movie => {
  let isCorrect = true;
  for (let prop of movieRequiredProps) {
    if (!movie[prop]) {
      isCorrect = false;
      break;
    }
  }
  return isCorrect;
};

const parseDigit = (n) => n > 9 ? n + '' : `0${n}`