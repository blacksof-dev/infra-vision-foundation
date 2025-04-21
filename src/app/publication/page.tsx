import PublicationBanner from "./01_banner";
import ReserachPaper from "./02_research";
import WhitePaper from "./03_whitePaper";
import Insights from "./04_newsletter";
import InfravisionTalk from "./05_infravisionTalk";
import Permission from "./06_permission";


export default function Publication(){
    return(
        <>
        <PublicationBanner/>
        <ReserachPaper/>
        <WhitePaper/>
         <Insights/>
         <InfravisionTalk/>
         <Permission/>
        </>
    )
}