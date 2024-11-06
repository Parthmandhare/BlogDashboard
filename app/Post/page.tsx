'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Post = () => {
  const [postData, setPostData]:any = useState(null);
  const [userData, setUserData]:any = useState(null);
  const [postComments, setPostComments]:any = useState([]);
  const [newComment, setNewComment] = useState('');

  const searchParams = useSearchParams()

  useEffect(() => {
    const postID = searchParams.get('id');
    fetchPostData(postID);
    fetchUserData(postID);
    fetchComments(postID);
  }, [searchParams]);

  const fetchComments = async(Postid: any) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${Postid}/comments`)
    .then((response) => response.json())
    .then((json) => setPostComments(json));
  }

  const fetchPostData = async (id : any) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const data = await response.json();
      setPostData(data);
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  };

  const fetchUserData = async (postID: any) => {
    try {
      const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`);
      const postData = await postResponse.json();
      const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
      const userData = await userResponse.json();
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      const newCommentData = {
        postId: searchParams.get('id'),
        name: 'Parth',
        email: 'parth@example.com',
        body: newComment
      };

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCommentData),
        });
        const data = await response.json();
        setPostComments([...postComments, data]);
        setNewComment('');
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    }
  };

  if (!postData || !userData) {
    return <div>Loading...</div>;
  }
  return (
   <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24  antialiased">
    <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
      <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
        <header className="mb-4 lg:mb-6 not-format">
          <address className="flex items-center mb-6 not-italic">
            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              <img
                className="mr-4 w-16 h-16 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                alt="Jese Leos"
              />
              <div>
                <a
                  href="#"
                  rel="author"
                  className="text-xl font-bold text-gray-900 "
                >
                  {userData.name}

                </a>
                
              </div>
            </div>
          </address>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl ">
          {postData.title}
          </h1>
        </header>

        <p>
          {postData.body}
        </p>

        <section className="not-format mt-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
              Discussion 
            </h2>
          </div>
          <form className="mb-6" onSubmit={handleCommentSubmit}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 ">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows={6}
                className="px-0 w-full text-sm  border-0 focus:ring-0 dark:placeholder-gray-400 "
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Post comment
            </button>
          </form>

          {/* comment */}

          {postComments.map((comment : any) => ( 
            <article className="p-6 mb-6 text-base bg-white rounded-lg ">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 ">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael Gough"
                  />
                  {comment.name}
                </p>
                
              </div>
             
              
            </footer>
            <p>
            {comment.body}
            </p>
            
          </article>
          ) ) }

          

         
         
        </section>
      </article>
    </div>
  </main>
  
  
   </>
  )
}

export default Post