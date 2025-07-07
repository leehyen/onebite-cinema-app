import SearchableLayout from "@/components/searchabel-layout";
import { ReactNode } from "react";
import movies from "@/mock/dummy.json"; //@는 src폴더를 가르키는 경로
import style from "./index.module.css";
import MovieItem from "@/components/movie-item";
import fetchOneMovie from "@/lib/fetch-one-movie";
import fetchRandomMovies from "@/lib/fetch-random-movies";
import fetchMovies from "@/lib/fetch-movies";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps=async()=>{
  const [allMovies,recoMovies]=await Promise.all([
    fetchMovies(),fetchRandomMovies()
  ]);
  return{
    props:{allMovies,recoMovies,}
  }
}

export default function Home({
  allMovies,recoMovies,
}:InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
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
  );
}

Home.getLayout=(page: ReactNode ) => { //getLayout 메서드
  return <SearchableLayout>{page}</SearchableLayout>;
}