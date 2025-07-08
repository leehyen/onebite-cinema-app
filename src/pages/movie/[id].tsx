
import { useRouter } from "next/router";
import style from './[id].module.css'
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchOneMovie from "@/lib/fetch-one-movie";
import Head from "next/head";

export const getStaticPaths=()=>{
  return {
    paths:[{params:{id:"1"}}, {params:{id:"2"}},{params:{id:"3"}},],
    fallback:true,
  };
};

export const getStaticProps =async(
  context:GetStaticPropsContext
)=>{
  const id=context.params!.id; 
  const movie=await fetchOneMovie(Number (id));
  
  if(!movie){
    return{notFound:true,}; 
  }
  return{ props:{movie},};
};

export default function Page({
  movie,
}:InferGetStaticPropsType<typeof getStaticProps>){
  const router=useRouter();
  if(router.isFallback){
      return(
        <>
        <Head>
          <title>한입씨네마</title>
          <meta property="og:image" content="/thumbnail.png"/>
          <meta property="og:title" content="한입씨네마"/>
          <meta property="og:description" content="한입 씨네마에 등록된 영화들을 만나보세요"/>
        </Head>
        <div> "로딩중입니다."</div>
        </>
      );
    } 
  if(!movie) return "문제가 발생했습니다. 다시 시도하세요." 

   const {
        id,title,releaseDate,company,genres,subTitle,description,runtime,posterImgUrl,
    }=movie;

   return (
    <>
    <Head>
      <title>{title}</title>
      <meta property="og:image" content={posterImgUrl}/>
      <meta property="og:title" content={title}/>
      <meta property="og:description" content={description}/>
    </Head>
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
   </>
   )
}