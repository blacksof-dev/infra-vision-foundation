"use client"
import React, { useState } from "react";
export default function LargeList() {
    const listData = [];
    for (let i = 1; i <= 1000; i++) {
        listData.push(i)
    }


    const [count,setCount] = useState(0)

    return (
        <div>

            <button className="cursor-pointer border-2 border-pink my-4" onClick={()=>setCount((prev)=>prev+1)}>
                Re-Render parent - {count}
            </button>

            <ul>
              {listData.map((ele,index)=>(
                 <ListItem value={ele}/>
              ))}
            </ul>
        </div>
    )
}




export const ListItem= React.memo(({value}:{value:number})=>{
console.log("Rendered:", value);
return <li>Item - {value}</li>
})


// export default function Parent() {
//   const [count, setCount] = React.useState(0);

//   const user = React.useMemo(() => {
//     return { name: "Aditi" };
//   }, []);

//   return (
//     <>
//       <button onClick={() => setCount(c => c + 1)}>
//         Re-render Parent
//       </button>

//       <Child user={user} />
//     </>
//   );
// }


// const Child = React.memo(({ user }:{user:any}) => {
//   console.log("Child rendered");
//   return <div>{user.name}</div>;
// });