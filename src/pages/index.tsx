import SearchableLayout from "@/components/searchabel-layout";
import { ReactNode } from "react";
import style from "./index.module.css";
import MovieItem from "@/components/movie-item";
import fetchRandomMovies from "@/lib/fetch-random-movies";
import fetchMovies from "@/lib/fetch-movies";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";

export const getStaticProps=async()=>{
  const [allMovies,recoMovies]=await Promise.all([
    fetchMovies(),fetchRandomMovies()
  ]);
  return{
    props:{allMovies,recoMovies,},
    revalidate:3,
  };
};

export default function Home({
  allMovies,recoMovies,
}:InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
    <Head>
      <title>한입씨네마</title>
      <meta property="og:image" content="/thumbnail.png"/>
      <meta property="og:title" content="한입씨네마"/>
      <meta property="og:description" content="한입 씨네마에 등록된 영화들을 만나보세요"/>
    </Head>
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div>
         {recoMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} imgSize="30"/>
          ))}
        </div>
      </section>

      <section>
        <h3>등록한 모든 영화</h3>
        <div>
          {allMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} imgSize="20" />
          ))}
        </div>
      </section>
    </div>
    </>
  );
}

Home.getLayout=(page: ReactNode ) => { //getLayout 메서드
  return <SearchableLayout>{page}</SearchableLayout>;
}