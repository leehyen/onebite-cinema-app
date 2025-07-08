import SearchableLayout from "@/components/searchabel-layout";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import MovieItem from "@/components/movie-item";
import fetchMovies from "@/lib/fetch-movies";
import { MovieData } from "@/types";
import Head from "next/head";

export default function Page(){

    const[movies,setMovies]=useState<MovieData[]>([])
    const router=useRouter();
    const q=router.query.q;

    const fetchSearchResult=async()=>{
        const data=await fetchMovies(q as string);
        setMovies(data);
    };
    useEffect(()=>{
        if(q){
            fetchSearchResult();
        }
    },[q]);
    return(
        <div>
            <Head>
                <title>한입씨네마 - 검색결과</title>
                <meta property="og:image" content="/thumbnail.png"/>
                <meta property="og:title" content="한입씨네마 - 검색결과"/>
                <meta property="og:description" content="한입 씨네마에 등록된 영화들을 만나보세요"/>
            </Head>
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