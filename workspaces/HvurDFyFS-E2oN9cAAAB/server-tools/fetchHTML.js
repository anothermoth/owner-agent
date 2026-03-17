export default async function(args) {
  const response = await fetch(args.url);
  const html = await response.text();
  return html;
}