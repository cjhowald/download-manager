import type { DownloadStatus } from "../types/download-file";

const toSentenceCase = (str: string) => {
  if (str === "" || str === undefined || str === null) return "";
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

export const formatStatus = (status: DownloadStatus): string =>
  toSentenceCase(status);
