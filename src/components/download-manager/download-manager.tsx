import "./download-manager.css";
import type { DownloadFile } from "../../types/download-file";

export interface DownloadManagerProps {
  files: DownloadFile[];
}

export const DownloadManager = ({ files }: DownloadManagerProps) => {
  return (
    <div className="border border-gray-300 w-full">
      <div className="flex items-center border-b border-gray-300">
        <input className="m-2" type="checkbox" />
        <span className="m-2">Selected 2</span>
        <button className="m-2">Download Selected</button>
      </div>
      <table className="    text-left border-collapse w-full">
        <thead className="border-b border-gray-300">
          <tr>
            <th className="p-2"></th>
            <th className="p-2">Name</th>
            <th className="p-2">Device</th>
            <th className="p-2">Path</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {files?.map((file) => (
            <tr className="border-b border-gray-300 p-2">
              <td className="m-x-4 p-2">
                <input type="checkbox" />
              </td>
              <td className="p-2">{file.name}</td>
              <td className="p-2">{file.device}</td>
              <td className="p-2">{file.path}</td>
              <td className="p-2">{file.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
