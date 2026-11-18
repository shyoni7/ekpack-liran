// מזריק סימון מובנה (schema.org) לעמוד.
// ה-`<` מומר ל-< כדי למנוע הזרקת HTML דרך תוכן שמגיע מה-DB.
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
