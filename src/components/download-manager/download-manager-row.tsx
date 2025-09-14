import type { DownloadFile } from "../../types/download-file";

export interface DownloadManagerRowProps {
  file: DownloadFile;
  id: string;
  selected: boolean;
  onSelect: (selected: boolean) => void;
}

export const DownloadManagerRow = ({
  file,
  id,
  selected,
  onSelect,
}: DownloadManagerRowProps) => {
  return (
    <tr className="border-b border-gray-300 p-2" id={id}>
      <td className="m-x-4 p-2">
        <input
          id={id}
          checked={selected}
          type="checkbox"
          onChange={(e) => onSelect(!!e.target.checked)}
        />
      </td>
      <td className="p-2">{file.name}</td>
      <td className="p-2">{file.device}</td>
      <td className="p-2">{file.path}</td>
      <td className="p-2">{file.status}</td>
    </tr>
  );
};
