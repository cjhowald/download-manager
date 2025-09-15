import "./Demo.css";
import { DownloadManager } from "../../lib/main";
import testInput from "../test-input.json";
import type { DownloadFile } from "../types/download-file";

function App() {
  return <DownloadManager files={testInput as DownloadFile[]} />;
}

export default App;
