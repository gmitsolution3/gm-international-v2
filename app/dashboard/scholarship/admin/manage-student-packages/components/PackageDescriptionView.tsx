export function PackageDescriptionView({ html }: { html: string }) {
  return (
    <div
      className="prose max-w-7xl mx-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
