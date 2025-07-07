import SearchableLayout from "@/components/searchabel-layout";
import { ReactNode } from "react";
import movies from "@/mock/dummy.json"
import MovieItem from "@/components/movie-item"; 
import { useRouter } from "next/router";

export default function Page(){
    const router = useRouter();
    const q = (router.query.q || "") as string;

    //아무것도 검색안하면 3개만 나오도록
    const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 3);


    return(
        <div>
            {filtered.length > 0 ? (filtered.map((movie) => (
                <MovieItem key={movie.id} {...movie} />
            ))) : (
                <p>검색 결과가 없습니다.</p>
            )}
        </div>
    )
}

//페이지별 개별 레이아웃 설정하고싶으면
Page.getLayout=(page:ReactNode)=>{
    return <SearchableLayout>{page}</SearchableLayout>;
}