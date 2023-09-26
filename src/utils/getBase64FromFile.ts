const getBase64FromFile = (file: File) =>
  new Promise<string | null>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve(reader.result?.toString().replace(/^.+?,/, "") ?? null);
    reader.onerror = reject;
  });

export default getBase64FromFile;
