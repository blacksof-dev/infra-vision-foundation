"use client";
import edjsHTML from "editorjs-html";

const edjsParser = edjsHTML({
  header: ({ data }: any) => {
    const text = data.text
      .replace(/<b>/g, '<b class="font-semibold">')
      .replace(/<strong>/g, '<strong class="font-medium">');
    return `<h${data.level} class="${data.level === 4 ? "font-medium mb-1 mt-4" : "leading-snug font-light text-lg md:text-xl xl:text-4xl my-4"} ${text.includes("pink") ? "text-pink" : ""}">${text}</h${data.level}>`;
  },
  paragraph: ({ data }: any) => {
    let text = data.text
      .replace(/<b>/g, '<b class="font-semibold">')
      .replace(/<strong>/g, '<strong class="font-medium">');

    text = text.replace(
      /<a([^>]*)>(\d+)<\/a>/g,
      `<sup class="text-sm super-align">
       <a $1 class="underline font-medium text-pink">$2</a>
     </sup>`,
    );

    text = text.replace(
      /<a([^>]*)>([^<]+)<\/a>/g,
      `<a $1 class="underline text-darkgray ">$2</a>`,
    );
    return `<p class="font-light text-base xl:text-xl font-poppins mt-4">${text}</p>`;
  },
  image: ({ data }: any) => {
    const url = data.file?.url;
    const caption = data.caption || "";

    return `
   
      <div class="my-6">
        <img 
          src="${url}" 
          alt="${caption}" 
          class=" object-cover rounded-xl  w-full max-h-[45rem]"
        />
      </div>
  `;
  },
  list: ({ data }: any) =>
    `<${data.style === "ordered" ? "ol" : "ul"} class="list-disc pl-5 space-y-2 mt-2">${data.items.map((i: any) => `<li>${i.content || i}</li>`).join("")}</${data.style === "ordered" ? "ol" : "ul"}>`,
});

export default function EditorRenderer({ data }: { data: any }) {
  if (!data) return null;
  const parsed = typeof data === "string" ? JSON.parse(data) : data;
  const html = edjsParser.parse(parsed.blocks ? parsed : { blocks: parsed });
  return (
    <div className="editorjs-content ">
      {(Array.isArray(html) ? html : [html]).map((h, i) => (
        <div key={i} dangerouslySetInnerHTML={{ __html: h }} />
      ))}
    </div>
  );
}
