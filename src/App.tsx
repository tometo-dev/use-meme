import * as React from "react"
import { useMeme } from "./use-meme"

function App() {
  const { meme } = useMeme()

  return <pre>{JSON.stringify(meme, null, 2)}</pre>
}

export default App
