// "use client";
// import { useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// export default function SearchFunctionality() {
//   const searchParams = useSearchParams();
//   const query = searchParams.get("q") || "";

//   useEffect(() => {
//     const cx = "850e8def017d04e42";
//     const script = document.createElement("script");
//     script.src = `https://cse.google.com/cse.js?cx=${cx}`;
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   return (
//     <div className="w-container pt-32 px-4">
//       <h1 className="text-xl mb-4">
//         Search results for: <strong>{query}</strong>
//       </h1>
//       <div className="gcse-searchresults-only"></div>
//     </div>
//   );
// }
