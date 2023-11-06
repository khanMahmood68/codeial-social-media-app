import { createContext } from "react";
import { useProvidePosts } from "../hooks";

const initialState = {
    potsts : [],
    loading:true
}

export const PostsContext = createContext(initialState)


export const PostsProvider = ({children})=>{
    const posts = useProvidePosts()
    return(
        <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
    )
}