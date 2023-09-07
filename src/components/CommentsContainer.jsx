/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
const CommentsData = [
  {
    name: "Siddhesh",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
    replies: [
      {
        name: "Siddhesh",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
        replies: [],
      },
      {
        name: "Siddhesh",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
        replies: [],
      },
      {
        name: "Siddhesh",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
        replies: [
          {
            name: "Siddhesh",
            comment:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
            replies: [
              {
                name: "Siddhesh",
                comment:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Siddhesh",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
    replies: [
      {
        name: "Siddhesh",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
        replies: [],
      },
      {
        name: "Siddhesh",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
        replies: [],
      },
      {
        name: "Siddhesh",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
        replies: [
          {
            name: "Siddhesh",
            comment:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
            replies: [
              {
                name: "Siddhesh",
                comment:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem similique modi nemo?",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

const Comment = ({ data }) => {
  const { name, comment, replies } = data;
  console.log(data);
  return (
    <div className="flex items-center rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 mr-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>

      <div>
        <p className="font-semibold text-gray-700">{name}</p>
        <p className="text-gray-600">{comment}</p>
      </div>
    </div>
  );
};
const CommentList = ({ CommentsData }) => {
  return CommentsData.map((comment, index) => (
    <div key={index}>
      <Comment data={comment} />
      <div className="pl-5 border border-l-gray-600">
        <CommentList CommentsData={comment.replies} />
      </div>
    </div>
  ));
};
const CommentsContainer = () => {
  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold">Comments:</h1>
      <CommentList CommentsData={CommentsData} />
    </div>
  );
};

export default CommentsContainer;
