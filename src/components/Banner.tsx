import React, { useState, useEffect, FC } from 'react' // eslint-disable-line
import axios from '../axios'
import { requests } from '../request'
import './Banner.scss'

type movieProps = {
  name?: string
  orignal_name?: string
  backdrop_path?: string
  overview?: string
}

export const Banner: FC = () => {
  const [movie, setMovie] = useState<movieProps>({})

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.feachNetflixOriginals)

      // apiからランダムで値を取得
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ],
      )

      return request
    }
    fetchData()
  }, [])

  // descriptionの切り捨てよう関数
  const truncate = (str: any, n: number) => {
    // undefinedを弾く
    if (str !== undefined) {
      return str.length > n ? `${str?.substr(0, n - 1)}...` : str
    }

    return str
  }

  return (
    <header
      className="Banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
        backgroundPosition: 'top center',
      }}
    >
      <div className="Banner-contents">
        <h1 className="banner-title">{movie?.name || movie?.orignal_name}</h1>
        <div className="Banner-buttons">
          <button className="Banner-button" type="button">
            Play
          </button>
          <button className="Banner-button" type="button">
            My List
          </button>
        </div>

        <h1 className="Banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="Banner-fadeBottom" />
    </header>
  )
}
