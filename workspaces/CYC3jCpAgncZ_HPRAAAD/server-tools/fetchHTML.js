export default async function(args) {
  const response = await fetch(args.url);
  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
  }
  return await response.text();
}