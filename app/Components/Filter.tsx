'use client'

import React from 'react'

import { useState } from 'react';
// import { FaCaretDown } from 'react-icons/fa';

const Filter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('Filter');

    const languages = ['DSA Self Placed', 'JavaScript',
                       'Python', 'Java', 'C++', 'Ruby',
                       'Go', 'TypeScript'];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (language: string) => {
        setSelectedLanguage(language);
        setIsOpen(false);
    };

    return (
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
    );

}

export default Filter