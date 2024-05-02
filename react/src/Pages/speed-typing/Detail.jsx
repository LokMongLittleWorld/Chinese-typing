import { useParams } from "react-router-dom";

export default function Detail() {
  let { id: articleId } = useParams();
  return <div>this is detail page with key: {articleId}</div>;
}
