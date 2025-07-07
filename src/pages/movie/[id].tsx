
import { useRouter } from "next/router";
import style from './[id].module.css'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchOneMovie from "@/lib/fetch-one-movie";

export const getServerSideProps =async(
  context:GetServerSidePropsContext
)=>{
  const id=context.params!.id; //.params! 에 느낌표 단언은 'undefined가 아닐거다'라는 뜻
  const movie=await fetchOneMovie(Number (id));
  console.log(id);

  return{
    props:{
      movie
    },
  };
};

export default function Page({
  movie,
}:InferGetServerSidePropsType<typeof getServerSideProps>){
  if(!movie) return "문데가 발생했습니다. 다시 시도하세요."

   const {
        id,title,releaseDate,company,genres,subTitle,description,runtime,posterImgUrl,
    }=movie;

   return (
   <div className={style.container}>
        <div 
            className={style.cover_img_container} 
            style={{backgroundImage:`url('${posterImgUrl}')`}}>
            <img src={posterImgUrl}/>
        </div>

        <div className={style.title} >{title}</div>
        <div className={style.memo} >{releaseDate} / {genres} / {runtime}</div>
        <div className={style.company} >{company}</div>
        <div className={style.subTitle} >{subTitle}</div>
        <div className={style.description} >{description}</div>
   </div>
   )
}