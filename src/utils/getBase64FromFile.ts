const getBase64FromFile = (file: File) =>
  new Promise<string | null>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() ?? null);
    reader.onerror = reject;
  });

export default getBase64FromFile;
