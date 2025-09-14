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
  const disableSelect = file.status !== "available";
  const rowID = `row-${id}`;
  return (
    <tr
      className="border-b border-gray-300 p-2 cursor-pointer"
      onClick={() => onSelect(!selected)}
      id={rowID}
    >
      <td className="m-x-4 p-2">
        <input
          id={id}
          disabled={disableSelect}
          checked={disableSelect ? false : selected}
          aria-labelledby={rowID}
          type="checkbox"
          onChange={() => onSelect(!selected)}
        />
      </td>
      <td className="p-2">
        <label htmlFor={id}></label>
        {file.name}
      </td>
      <td className="p-2">
        <label htmlFor={id}>{file.device}</label>
      </td>
      <td className="p-2">{file.path}</td>
      <td className="p-2">{file.status}</td>
    </tr>
  );
};
