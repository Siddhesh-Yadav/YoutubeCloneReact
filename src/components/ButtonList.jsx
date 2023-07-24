// import React from 'react'



const ButtonList = () => {
    const btnArr = ['All',"Agt","AI","Music","Live","News","Biology","Mixes"];
  return (
    // <div></div>
    <div id="ButtonList" className="fixed flex top-14 bg-white  w-full py-2 z-10 ">
        {btnArr.map(e=><button className="py-1 px-5 mx-2 bg-gray-200 rounded" key={e}>{e}</button>)}
    </div>
  )
}

export default ButtonList;




