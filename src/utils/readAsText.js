export default function readAsText(file) {
  if (!(file instanceof Blob)) {
    throw new TypeError("Must be a File or Blob");
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = (e) => {
      reject(new Error("Error reading" + file.name + ": " + e.target.result));
    };
    reader.readAsText(file);
  });
}
