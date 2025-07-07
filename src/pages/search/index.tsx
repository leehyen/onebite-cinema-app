import SearchableLayout from "@/components/searchabel-layout";
import { ReactNode } from "react";
import movies from "@/mock/dummy.json"
import MovieItem from "@/components/movie-item"; 
import { useRouter } from "next/router";
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";

export const getServerSideProps=async(
    conetxt:GetServerSidePropsContext
)=>{
    const q=conetxt.query.q;
    const movies=await fetchMovies(q as string);
    return{
        props:{
            movies,
        },
    };
}

export default function Page({
   movies,
}:InferGetStaticPropsType<typeof getServerSideProps>){

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