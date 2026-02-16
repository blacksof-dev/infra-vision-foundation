"use client";
import edjsHTML from "editorjs-html";

const edjsParser = edjsHTML({
  header: ({ data }: any) =>
    `<h${data.level} class="${data.level === 4 ? "font-medium mb-1 mt-4" : "leading-snug font-light text-xl md:text-2xl xl:text-4xl my-4"} ${data.text.includes("pink") ? "text-pink" : ""}">${data.text}</h${data.level}>`,
  paragraph: ({ data }: any) =>
    `<p class="font-light text-base xl:text-xl mt-4">${data.text}</p>`,
  list: ({ data }: any) =>
    `<${data.style === "ordered" ? "ol" : "ul"} class="list-disc pl-5 space-y-2 mt-2">${data.items.map((i: any) => `<li>${i.content || i}</li>`).join("")}</${data.style === "ordered" ? "ol" : "ul"}>`,
});

export default function EditorRenderer({ data }: { data: any }) {
  if (!data) return null;
  const parsed = typeof data === "string" ? JSON.parse(data) : data;
  const html = edjsParser.parse(parsed.blocks ? parsed : { blocks: parsed });

  return (
    <div className="editorjs-content">
      {(Array.isArray(html) ? html : [html]).map((h, i) => (
        <div key={i} dangerouslySetInnerHTML={{ __html: h }} />
      ))}
    </div>
  );
}

