const downloadBinary = (binary, fileName) => {
  const url = window == null ? void 0 : window.URL.createObjectURL(binary);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window == null ? void 0 : window.URL.revokeObjectURL(url);
};
const downloadFile = (fileUrl, filename) => {
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = filename;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
export {
  downloadFile as a,
  downloadBinary as d
};
