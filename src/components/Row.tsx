import React, { useState, useEffect } from 'react' // eslint-disable-line
import axios from '../axios'
import './Row.scss'

const baseUrl = 'https://image.tmdb.org/t/p/original'

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

export const Row = ({ title, fetchUrl, isLargeRow }: Props): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl)
      setMovies(request.data.results)

      return request
    }
    fetchData()
  }, [fetchUrl])

  return (
    <div className="Row">
      <h2 className="Row-title">{title}</h2>
      <div className="Row-posters">
        {/* ポスターコンテンツ */}
        {movies.map((movie, i) => (
          <img
            key={movie.id}
            className={`Row-poster ${i} ${isLargeRow && 'Row-poster-large'}`}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  )
}

Row.defaultProps = {
  isLargeRow: false,
}
