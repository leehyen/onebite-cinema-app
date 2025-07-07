import { MovieItem } from "@/types";

export default async function fetchOneMovie(
    id:number
):Promise<MovieItem | null>{
    const url=`http://localhost:12345/movie/${id}`;

    try{
        const response=await fetch(url); //url전달
        if(!response.ok){
            throw new Error();
        }

        return await response.json();
    }catch(err){
        console.error(err);
        return null;
    }
}