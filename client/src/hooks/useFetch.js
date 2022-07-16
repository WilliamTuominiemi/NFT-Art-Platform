import { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setData(null)
      setIsLoading(true)
      setIsError(false)

      const res = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })

      if (res.ok) {
        const json = await res.json()
        setData(json)
      } else {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [url])

  return {
    data,
    isLoading,
    isError,
  }
}

export default useFetch
