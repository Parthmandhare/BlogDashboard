"use client";

import Cards from "./Components/Cards";
import { useEffect, useState } from "react";



export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // axios.get("https://jsonplaceholder.typicode.com/posts")
    //   .then(async(res) => {
    //     setPosts(res.data);
    //     console.log(posts);
        
    //   });

  fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((json) => {console.log(json); setPosts(json)});

  
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Filter');

  const languages = ['Parth', 'Prasad', 'Shreerang', 'Gargi'];

  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };

  const handleSelect = (language: string) => {
      setSelectedLanguage(language);
      setIsOpen(false);
  };


  return (
    <>
      <div className="mx-5 flex flex-col gap-2 ">
        <div className="flex flex-row justify-between ">
          <div>Recent Blogs</div>
          <div>
          <div className="flex justify-center">
            <div className="relative inline-block text-left">
                {/* Dropdown button */}
                <button
                    type="button"
                    className="inline-flex justify-center w-full
                               rounded-md border border-gray-300
                               shadow-sm px-3 py-1 bg-white text-sm
                               font-medium text-black hover:bg-gray-50"
                    onClick={toggleDropdown}
                >
                    {selectedLanguage}
                    {/* <FaCaretDown className="ml-2" /> */}
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                    <div className="origin-top-right absolute
                                    right-0 mt-2 w-56 rounded-md
                                    shadow-lg bg-white ring-1 ring-black
                                    ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {languages.map((language, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="block px-4 py-2
                                               text-sm text-black
                                               hover:bg-gray-100"
                                    onClick={() => handleSelect(language)}
                                >
                                    {language}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {posts && posts.map((post) => (
            <Cards mypost={post} />
          ))}
        </div>
      </div>

      {/* <button onClick={() => {console.log(posts)}}>click</button> */}
    </>
  );
}