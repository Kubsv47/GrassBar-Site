export function normalizeLogoUrl(input) {
  if (!input) return null;
  const url = String(input).trim();

  const fileMatch = url.match(/wikipedia\.org\/(?:wiki|w)\/.*?(?:File|Plik):([^?#]+)/i);
  if (fileMatch) {
    const fileName = decodeURIComponent(fileMatch[1]); 
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=120`;
  }
  
  if (/upload\.wikimedia\.org/i.test(url)) return url;

  return url;
}