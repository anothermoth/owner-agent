export default async function(args) {
  const { url } = args;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${url} with status ${response.status}`);
  }
  const html = await response.text();
  return html;
}