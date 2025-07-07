import { MovieData } from "@/types";
import Link from "next/link";
import style from './movie-item.module.css'

type MovieItemProps = MovieData & {
  imgSize?: "20" | "30"; // 사용할 사이즈 키워드
};

export default function MovieItem({
  id, title, releaseDate, company, genres, subTitle, description, runtime, posterImgUrl,
  imgSize = "30", // 기본값 30%
}: MovieItemProps) {
  const imgClass = imgSize === "20" ? style.img20 : style.img30;
  return (
    <Link href={`/movie/${id}`} className={style.container}>
      <img src={posterImgUrl} className={imgClass} />
    </Link>
  );
}