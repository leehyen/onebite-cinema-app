import SearchableLayout from "@/components/searchabel-layout";
import { ReactNode } from "react";

export default function Home() {
  return (
    <>
    </>
  );
}

Home.getLayout=(page: ReactNode ) => { //getLayout 메서드
  return <SearchableLayout>{page}</SearchableLayout>;
}