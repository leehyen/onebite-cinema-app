import SearchableLayout from "@/components/searchabel-layout";
import {useRouter} from "next/router";
import { ReactNode } from "react";


export default function Page(){
    const router=useRouter();
    const {q}=router.query;

    return <h1>검색결과 : {q}</h1>;
}

//페이지별 개별 레이아웃 설정하고싶으면
Page.getLayout=(page:ReactNode)=>{
    return <SearchableLayout>{page}</SearchableLayout>;
}