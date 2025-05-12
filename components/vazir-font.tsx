
async function VazirFont() {
  const buffer = await fetch(new URL('./font/Vazir-Bold.ttf', import.meta.url)).then(res => res.arrayBuffer());
  return { buffer, font: { family: "Vazir", weight: "bold" } };
}
