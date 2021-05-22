import { useEffect, useState } from "react"
import axios from "axios"

const BASE_URL = `https://meme-api.herokuapp.com/gimme`

type TMeme = {
  postLink: string
  subreddit: string
  title: string
  url: string
  nsfw: boolean
  spoiler: boolean
  author: string
  ups: string
  preview: Array<string>
}

type TMultipleMemes = {
  count: number
  memes: Array<TMeme>
}

type TMemeResponse = TMeme | TMultipleMemes
type TStatus = "fetching" | "success" | "failure" | "undefined"

type TMemeResult<TResponse> = {
  status: TStatus
  meme: TResponse
  error: any
}

function useMeme(): TMemeResult<TMeme>
function useMeme({ subreddit }: { subreddit: string }): TMemeResult<TMeme>
function useMeme({ count }: { count: number }): TMemeResult<TMultipleMemes>
function useMeme({
  subreddit,
  count,
}: { subreddit?: string; count?: number } = {}) {
  const [response, setResponse] = useState<{
    status: TStatus
    meme: TMemeResponse | undefined
    error: any
  }>({
    status: "undefined",
    meme: undefined,
    error: undefined,
  })

  useEffect(() => {
    let url = BASE_URL
    if (subreddit) {
      url = `${BASE_URL}/${subreddit}`
    }
    if (count) {
      url = `${url}/${count}`
    }
    setResponse((response) => ({
      ...response,
      error: undefined,
      status: "fetching",
    }))
    axios
      .get<TMemeResponse>(url)
      .then((res) => {
        setResponse({ status: "success", meme: res.data, error: undefined })
      })
      .catch((error) => {
        setResponse({
          status: "failure",
          meme: undefined,
          error,
        })
      })
  }, [subreddit, count])

  return response
}

export { useMeme }
