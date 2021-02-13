import React, { useState, useEffect } from 'react' // eslint-disable-line
import YouTube from 'react-youtube'
import axios from '../axios'
import './Row.scss'

const baseUrl = 'https://image.tmdb.org/t/p/original'
const API_KEY = process.env.REACT_APP_API_KEY

type Props = {
  title: string
  fetchUrl: string
  isLargeRow?: boolean
}

type Movie = {
  id: string
  name: string
  title: string
  original_name: string
  poster_path: string
  backdrop_path: string
}

type Options = {
  height: string
  width: string
  playerVars: {
    autoplay: 0 | 1 | undefined
  }
}

export const Row = ({ title, fetchUrl, isLargeRow }: Props): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [trailerUrl, setTrailerUrl] = useState<string | null>('')

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl)
      setMovies(request.data.results)

      return request
    }
    fetchData()
  }, [fetchUrl])

  const opts: Options = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  }

  const handleClick = async (movie: Movie) => {
    console.log(movie)
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      const trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=${API_KEY}`,
      )
      setTrailerUrl(trailerurl.data.results[0]?.key)
      console.log(trailerurl.data.results[0]?.key)
    }
  }

  // const handleKeyDown = (e: any, movie: Movie) => {
  //   if (e.keycode === 13) {
  //     handleClick(movie)
  //   }
  // }

  return (
    <div className="Row">
      <h2 className="Row-title">{title}</h2>
      <div className="Row-posters">
        {/* ポスターコンテンツ */}
        {movies.map((movie, i) => (
          /* eslint-disable */
          <img
            key={movie.id}
            className={`Row-poster ${i} ${isLargeRow && 'Row-poster-large'}`}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

Row.defaultProps = {
  isLargeRow: false,
}
