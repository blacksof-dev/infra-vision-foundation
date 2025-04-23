import ResourceBanner from "./01_banner";
import Blog from "./02_blogs";
import Video from "./03_video";
import NewsAndMedia from "./04_newsMedia";
import ResourceNewsLetter from "./06_newsletter";

export default function Resource(){

 return (
    <>
      <ResourceBanner/> 
      <Blog/>
      <Video/>
      
      <NewsAndMedia/>
      <ResourceNewsLetter/>
    </>
 )
 
}