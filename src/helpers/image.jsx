export const dataURLToBlob = (dataURL) => {
  const base64 = dataURL.split(",")[1];
  const binaryString = window.atob(base64);
  const arrayBuffer = new ArrayBuffer(binaryString.length);
  const byteArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: "image/png" });
};
