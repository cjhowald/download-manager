import './App.css'
import { DownloadManager } from './components'
import testInput from './test-input.json'
import type { DownloadFile } from './types/download-file'

function App() {

  return (
    <>
      <h1>
        Download manager preview
      </h1>
      <DownloadManager files={testInput as DownloadFile[]} />
    </>
  )
}

export default App
