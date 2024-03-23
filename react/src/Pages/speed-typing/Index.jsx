import Essays from "../../../static/speed-typing/twelve_model_essays.json";
import ArticleDisplayCard from "../../Components/ArticleDisplayCard.jsx";

export default function Index() {
  return (
    <main className="flex justify-center items-center mt-8">
      <div className="grid grid-cols-3 gap-4 w-[80%]">
        {Object.values(Essays).map((essay, index) => (
          <div key={index}>
            <ArticleDisplayCard title={essay?.title} content={essay?.content} />
          </div>
        ))}
      </div>
    </main>
  );
}
