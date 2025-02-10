// import React from 'react'



const ButtonList = () => {
    const btnArr = ["Agt","AI","Music","Live","News","Biology","Mixes","Lo-fi","Computer Science","Microsoft Windows","Mobile Phones"];
  return (
    // <div></div>
    <div id="ButtonList" className="fixed flex top-14  w-full py-2 z-10 bg-primary">
        <button className="py-2 px-3 mx-2 bg-textPrimary text-primary rounded-lg" >All</button>
        {btnArr.map(e=><button className="py-2 px-3 mx-2 bg-secondary rounded-lg" key={e}>{e}</button>)}
    </div>
  )
}

export default ButtonList;




