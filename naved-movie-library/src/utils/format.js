const IMAGE_BASE = "https://image.tmdb.org/t/p";

export const posterUrl = (path, size = "w500") =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

export const backdropUrl = (path, size = "w1280") =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

export const getYear = (date) => (date ? date.slice(0, 4) : "N/A");

export const formatRating = (value) =>
  typeof value === "number" && value > 0 ? value.toFixed(1) : null;

export const formatRuntime = (minutes) => {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m}m`;
  return m ? `${h}h ${m}m` : `${h}h`;
};

export const formatDate = (date) => {
  if (!date) return "N/A";
  const [y, m, d] = date.split("-").map(Number);
  if (!y || !m || !d) return date;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
