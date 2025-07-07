import { MovieItem } from "@/types";

export default async function fetchBooks(q?:string):Promise<MovieItem[]>{//서버로부터 모든 책들의 정보를 불러옴
    let url=`http://localhost:12345/movie`;
    if(q){
        url+=`/search?q=${q}`
    }
    try{
        const response=await fetch(url);
        if(!response.ok){
            throw new Error()
        }
        return await response.json()
    }
    catch(err){
        console.error(err);
        return [];
    }
}

//q? : 비어있어도 되는 선택적 프로퍼티로 만들어주기