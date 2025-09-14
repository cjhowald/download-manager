import "./download-manager.css";
import type { DownloadFile } from "../../types/download-file";
import { useState } from "react";
import { DownloadManagerRow } from "./download-manager-row";

export interface DownloadManagerProps {
  files: DownloadFile[];
}

// assumption: combination of device and path is unique among the list of files
const getFileID = (file: DownloadFile) => `${file.device}-${file.path}`;

export const DownloadManager = ({ files }: DownloadManagerProps) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const handleSelectChange = (id: string, selected: boolean) => {
    const updatedSelected = new Set(selectedRows);
    if (selected) {
      updatedSelected.add(id);
    } else {
      updatedSelected.delete(id);
    }
    setSelectedRows(updatedSelected);
  };

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
          {files?.map((file) => {
            const id = getFileID(file);
            return (
              <DownloadManagerRow
                file={file}
                id={id}
                selected={selectedRows.has(id)}
                onSelect={(selected) => handleSelectChange(id, selected)}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
