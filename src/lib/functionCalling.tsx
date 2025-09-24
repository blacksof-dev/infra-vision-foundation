export const getImageUrl = (path?: string): string => {
  if (!path) return "/assets/globals/fallback.jpg"; 
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
  const cleanPath = path.replace(/^\/+/, "");
  return `${baseUrl}/${cleanPath}`;
};

export const apiDateConversion =(date:string):string=>{
 if(!date){
  return "";
 }
  const d = new Date(date);
  return d.toLocaleDateString('en-US',{
    year:"numeric",
    month:'long',
    day:'numeric'
  })
}
