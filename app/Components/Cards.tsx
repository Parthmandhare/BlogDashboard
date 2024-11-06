// Components/Cards.tsx
"use client";

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface CardProps {
  mypost: {
    id: number;
    title: string;
    body: string;
    userId: number;
  };
}

interface User {
  id: number;
  name: string;
  email: string;
}

const Cards: React.FC<CardProps> = ({ mypost }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${mypost.userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [mypost.userId]);

  const truncatePostBody = (body: string, maxLength: number = 100) => {
    if (body.length <= maxLength) {
      return body;
    }
    return `${body.substring(0, maxLength)}...`;
  };


  

  return (
    <>
      <div className='flex flex-col gap-2 border-2 p-5 rounded-xl shadow-lg hover:shadow-md cursor-pointer' onClick={() => router.push(`/Post?id=${mypost.id}`)}>
        {/* Author name */}
        <div className='font-bold text-sm'>
          {user?.name}
        </div>
        <div className='font-bold'>
          {mypost.title}
        </div>
        <div>
          {truncatePostBody(mypost.body)}
        </div>
      </div>
    </>
  )
}

export default Cards