import React, { useState } from "react";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import Loading from './Loading'

const Search = ({ show }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
        if (e.target.value.length >= 5) {
            handleSearch();
        }
        // handleSearch();
    };

    const handleSearch = async () => {
        setIsLoading(true);
        const { data } = await axios.get(`/api/search?q=${query}`);
        if (data.results.length === 0) {
            setNoResults(true);
        } else {
            setResults(data.results);
            setNoResults(false);
        }
        setIsLoading(false);
    };

    return (
        <>
            <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90 ">

                {/* <div className="flex items-center justify-center mt-14 ">
        <h1 className="text-xl font-semibold tracking-tight lg:leading-tight text-brand-primary lg:text-3xl dark:text-white">Search results for "{query}"</h1>
    </div> */}
                <div className="max-w-md mx-auto mt-20  bg-white dark:bg-black w-full sm:max-w-lg rounded-lg shadow-xl m-auto relative ">
                    <div className="relative ">
                        <input
                            type="text"
                            value={query}
                            onChange={handleQueryChange}
                            // onChange={handleSearch}
                            placeholder="Search posts, tags and authors "
                            className="w-full py-4 pl-12 pr-8 border rounded-md outline-none focus:border-gray-300 focus:shadow-sm dark:bg-gray-900 dark:border-gray-600 dark:focus:border-white"
                        />
                        <div onClick={handleSearch} className="absolute inset-y-0 left-0 px-4 flex items-center pr-3 ">
                            <BiSearch size={20} />
                        </div>
                        <button
                            onClick={show}
                            className="absolute inset-y-0 right-0 px-4 "
                        >
                            Cancel
                        </button>
                    </div>
                    {isLoading ? (
                        <div className="overflow-y-auto max-h-[calc(100vh-172px)] sm:max-h-[70vh] -mt-[1px]">
                            <Loading />
                        </div>
                    ) : (
                        <div>
                            {noResults ? (
                                <div className="py-2 px-4 sm:px-7">
                                    No match found
                                </div>
                            ) : (
                        <div>
                            {results.length > 0 && (
                                <div className="overflow-y-auto max-h-[calc(100vh-172px)] sm:max-h-[70vh] -mt-[1px]">
                                        <div  className="border-t border-neutral-200 py-3 px-4 sm:px-7">
                                            <h1 className="uppercase text-xs text-neutral-400 font-semibold mb-1 tracking-wide">Authors</h1>
                                    {results.map((result) => (
                                            <div key={result._id} className="py-[1rem] -mx-4 sm:-mx-7 px-4 sm:px-7 cursor-pointer flex items-center ">
                                                <img
                                                    className="rounded-full  w-7 h-7 mr-2 object-cover"
                                                    src="https://www.upscprep.com/content/images/2022/06/Logo-white-bg--2--2.png" alt="UPSCprep.com" />
                                                <h2 className=" font-medium leading-tight  truncate">{result.title}</h2>
                                            </div>
                                    ))}
                                        </div>
                                        <div  className="border-t border-gray-200 py-3 px-4 sm:px-7">
                                            <h1 className="uppercase text-xs text-neutral-400 font-semibold mb-1 tracking-wide">Tags</h1>
                                    {results.map((result) => (
                                            <div key={result._id} className="flex items-center py-3 -mx-4 sm:-mx-7 px-4 sm:px-7 cursor-pointer">
                                                <p className="mr-2 text-sm font-bold text-neutral-400">#</p>
                                                <h2 className=" font-medium leading-tight  truncate">{result.title}</h2>
                                            </div>
                                                ))}
                                        </div>
                                        <div  className="border-t border-neutral-200 py-3 px-4 sm:px-7">
                                            <h1 className="uppercase text-xs text-neutral-400 font-semibold mb-1 tracking-wide">Posts</h1>
                                    {results.map((result) => (
                                            <div key={result._id} className="py-3 -mx-4 sm:-mx-7 px-4 sm:px-7 cursor-pointer">
                                                <h2 className=" font-medium leading-tight ">{result.title}<span
                                                    className="font-bold "> Prep</span></h2>
                                                <p className="text-neutral-400 leading-normal text-sm mt-0 mb-0 truncate">6 Ideas to help you build consistency
                                                    in UPSC CSE<span className="font-bold"> prep</span>aration</p>
                                            </div>
                                    ))}
                                            <button
                                                className="w-full my-3 p-2 border border-neutral-200 hover:border-neutral-300   font-semibold rounded transition duration-150 ease hover:ease">Show
                                                more results</button>
                                        </div>
                                </div>
                            )}
                        </div>
                            )}
                            </div>
                    )}
                </div>
            </div>
        </>
    );
};
export default Search;