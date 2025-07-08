import { MovieData } from "@/types";

export default async function fetchOneMovie(
    id:number
):Promise<MovieData | null>{
    const url=`https://onebite-cinema-api-main-three.vercel.app/movie/${id}`;

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