import type { DownloadFile } from "../../types/download-file";
import { formatStatus } from "../../util/status";

export interface DownloadManagerRowProps {
  file: DownloadFile;
  id: string;
  selected: boolean;
  onSelect: (selected: boolean) => void;
}

const greenDot = <span>&#128994;</span>; // UTF-8 green dot

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
      className={`border-b border-gray-300 p-2 cursor-pointer ${selected ? "bg-gray-100" : "hover:bg-gray-50"}`}
      onClick={() => (disableSelect ? null : onSelect(!selected))}
      id={rowID}
    >
      <td className="m-x-4 p-2">
        <input
          id={id}
          disabled={disableSelect}
          checked={disableSelect ? false : selected}
          aria-labelledby={rowID}
          type="checkbox"
          onChange={() => (disableSelect ? null : onSelect(!selected))}
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
      <td className="p-2 text-right">
        {file.status === "available" ? greenDot : null}
      </td>
      <td className="p-2">{formatStatus(file.status)}</td>
    </tr>
  );
};
