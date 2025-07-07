
import { useRouter } from "next/router";
import style from './[id].module.css'
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchOneMovie from "@/lib/fetch-one-movie";

//동적경로에 ssg설정1 ) getStaticPaths : 현재 이 페이지에 존재할 수 있는는 경로들을 먼저 설정 
export const getStaticPaths=()=>{
  return {
    paths:[{params:{id:"1"}}, {params:{id:"2"}},{params:{id:"3"}},],//url파라미터 값은 반드시 문자열로만 명시하기
    fallback:true,//브라우저에 접속요청 들어오면 이외의 값이 들어올때 대비책
    //true : SSR방식+데이터가 없는 폴백 상태의 페이지부터 반환, (지금 당장 사용할필요가없는 Props를 제외하고 빠르게 page를 출력할수있음)
    // props를 계산하는 getStaticProps의 호출은 생략하고 바로 Page 컴포넌트만 사전 렌더링해서 빠르게 브라우저에게 보내줌
    //UI를 먼저 렌더링하고 데이터는 나중에 전달해줌
  };
};

//동적경로에 ssg설정2) getStaticProps함수를 일일이 한 번씩 다 호출해서 사전에 여러개의 페이지를 렌더링
export const getStaticProps =async(
  context:GetStaticPropsContext
)=>{
  const id=context.params!.id; //.params! 에 느낌표 단언은 'undefined가 아닐거다'라는 뜻
  const movie=await fetchOneMovie(Number (id));
  
  if(!movie){//next서버가 자동으로 movie 불러오지 못했을때는
    return{notFound:true,}; //notFound(404페이지로)이동
  }
  return{ props:{movie},};
};

export default function Page({
  movie,
}:InferGetStaticPropsType<typeof getStaticProps>){

  //fallback상태란, page컴포넌트가 아직 서버로부터 데이터를 전달받지 못한 상태
  const router=useRouter(); //데이터 있는데 진짜 로딩중일때(데이터 끌어오고있을때) 라우터사용해서
  if(router.isFallback) return "로딩중입니다." //이렇게 로딩중임을 표현

  if(!movie) return "문제가 발생했습니다. 다시 시도하세요." //데이터 없으면

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