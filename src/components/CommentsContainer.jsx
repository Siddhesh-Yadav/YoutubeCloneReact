/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import UserIcon from "../assets/Icons/UserIcon.png";
const CommentsData = [
  {
    name : "Siddhesh",
    comment : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
    replies:[
      {
        name : "Siddhesh",
        comment : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
        replies:[]
      },
      {
        name : "Siddhesh",
        comment : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
        replies:[]
      },
      {
        name : "Siddhesh",
        comment : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
        replies:[
          {
            name : "Siddhesh",
            comment : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
            replies:[
              {
                name : "Siddhesh",
                comment : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
                replies:[]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name : "Siddhesh",
    comment : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
    replies:[
      {
        name : "Siddhesh",
        comment : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
        replies:[]
      },
      {
        name : "Siddhesh",
        comment : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
        replies:[]
      },
      {
        name : "Siddhesh",
        comment : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
        replies:[
          {
            name : "Siddhesh",
            comment : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
            replies:[
              {
                name : "Siddhesh",
                comment : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
                replies:[]
              }
            ]
          }
        ]
      }
    ]
  }
]


const Comment = ({data})=>{
  const {name, comment, replies}=data;
  console.log(data)
  return (
  <div className='flex items-center rounded'>
    <img className="w-6 h-6 mr-5" src={UserIcon} alt=""  />
    <div >
      <p className='font-semibold text-gray-700'>{name}</p>
      <p className='text-gray-600'>{comment}</p>
    </div>
  </div>
  )
}
const CommentList = ({CommentsData}) =>{
  return CommentsData.map((comment, index)=>(
    <div key={index}>
      <Comment  data={comment}/>
      <div className='pl-5 border border-l-gray-600'>
        <CommentList CommentsData={comment.replies} />
      </div>
    </div>
  ));
}
const CommentsContainer = () => {
  return (
    <div className='m-5 p-2'>
      <h1 className='text-2xl font-bold'>Comments:</h1>
      <CommentList CommentsData={CommentsData}/>
    </div>
  )
}

export default CommentsContainer