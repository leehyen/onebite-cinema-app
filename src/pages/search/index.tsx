import SearchableLayout from "@/components/searchabel-layout";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import MovieItem from "@/components/movie-item";
import fetchMovies from "@/lib/fetch-movies";
import { MovieData } from "@/types";

export default function Page(){

    const[movies,setMovies]=useState<MovieData[]>([])
    const router=useRouter();
    const q=router.query.q;

    const fetchSearchResult=async()=>{
        const data=await fetchMovies(q as string);
        setMovies(data);
    };
    useEffect(()=>{
        if(q){ //검색어있다면
            fetchSearchResult();
        }
    },[q]);
    return(
        <div>
           {movies.map((movie) => (
                <MovieItem key={movie.id} {...movie} />
            ))}
        </div>
    );
}

//페이지별 개별 레이아웃 설정하고싶으면
Page.getLayout=(page:ReactNode)=>{
    return <SearchableLayout>{page}</SearchableLayout>;
}