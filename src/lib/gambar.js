// Mengecilkan & mengompres foto yang diunggah agar muat di localStorage (batas ±5 MB).
export function fileToDataUrl(file, maxLebar = 1000, kualitas = 0.8) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("File harus berupa gambar (JPG, PNG, atau WEBP)."));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Gagal membaca file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("File gambar tidak valid."));
      img.onload = () => {
        const skala = Math.min(1, maxLebar / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * skala);
        canvas.height = Math.round(img.height * skala);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", kualitas));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
