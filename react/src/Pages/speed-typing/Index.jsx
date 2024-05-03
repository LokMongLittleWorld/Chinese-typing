import Articles from "../../../static/speed-typing/copypasta.json";
import ArticleDisplayCard from "../../Components/ArticleDisplayCard.jsx";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <main className="flex justify-center items-center mt-8">
      <div className="grid grid-cols-3 gap-4 w-[80%]">
        {Object.values(Articles).map((essay, index) => (
          <Link key={index} to={"/speed-typing/" + index}>
            <ArticleDisplayCard title={essay?.title} content={essay?.content} />
          </Link>
        ))}
      </div>
    </main>
  );
}
