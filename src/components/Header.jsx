// import React from 'react'
import HamBurgerMenuIcon from '../assets/Icons/HamBurgerMenuIcon.png';
import YouTubeLogo from "../assets/Icons/YouTubeLogo.png";
import UserIcon from "../assets/Icons/UserIcon.png";
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { useEffect, useState } from 'react';
import {YOUTUBE_SUGGESTTION_SEARCH_API} from "../utils/constants"
import { cacheResults } from '../utils/searchSlice';
import { Link } from 'react-router-dom';
const Header = () => {
  const dispatch = useDispatch();
  const searchCache = useSelector(store=> store.search);
  const [searchQuery,setSearchQuery]=useState("");
  const [searchSuggestion, setSearchSuggestions] =useState([]);
  const [showSuggestions,setShowSuggestions] = useState(false);
  useEffect(()=>{
    let timer = setTimeout(() => {
      if(searchCache[searchQuery]){
        setSearchSuggestions(searchCache[searchQuery])
      }else{
        getSearchSuggestions();      
      }
    }, 300);
    return ()=>{
      clearTimeout(timer);
    }
  },[searchQuery]);

  const toggleMenuHandler = ()=>{
    dispatch(toggleMenu());
  }
  const getSearchSuggestions =async()=>{
    const data =await fetch(YOUTUBE_SUGGESTTION_SEARCH_API+searchQuery);
    const json = await data.json();
    setSearchSuggestions(json[1]);
    dispatch(cacheResults({[searchQuery]:json[1]}))
  }
  return (
    <header className='flex justify-between items-center py-2 px-4 sticky top-0 bg-white z-50' >
      <div className='flex items-center '>
        <img className='MenuIcon w-6 h-6 cursor-pointer' src={HamBurgerMenuIcon} alt="" srcSet="" onClick={toggleMenuHandler}/>
        <Link to="/"><img className='YouTubeLogo w-24 mx-5' src={YouTubeLogo} alt="" srcSet="" /></Link>
      </div>
      <div className='z-50'>
        <input onBlur={()=>setShowSuggestions(false)} onFocus={()=>setShowSuggestions(true)} value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder='search' type="text" className='w-[37rem] py-2 pl-5 rounded-l-full border' />
        <button className='w-16 p-2 bg-slate-100 rounded-r-full border-slate-400'>🔍</button>
        {(showSuggestions && searchSuggestion?.length >0) &&<ul id="suggestions" className='absolute bg-white w-[37rem] py-2 px-5 shadow rounded mt-1 z-50'>
          {searchSuggestion.map(e=><li key={e}>{e}</li>)}
        </ul>}
       </div>
      <img className='MenuIcon w-6 h-6' src={UserIcon} alt="" />
    </header>
  )
}

export default Header