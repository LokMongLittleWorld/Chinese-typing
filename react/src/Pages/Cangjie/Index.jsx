import Record from "../../Components/Record.jsx";
import PracticeCategory from "../../Components/PracticeCategory.jsx";
import { useState } from "react";
import Radicals from "../../../static/cangjie/radicals.json";

export default function Index() {
  const category = ["字根訓練", "字形訓練", "單字訓練"];
  const [currentCategory, setCurrentCategory] = useState(category[0]);
  const [record, setRecord] = useState({ speed: 75, accuracy: 0.9 });
  return (
    <>
      <section className="mt-4 flex flex-row items-center justify-center gap-4">
        <Record speed={record.speed} accuracy={record.accuracy} />
        <PracticeCategory
          category={category}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
      </section>
      <main className="mt-2">
        <div className="flex flex-row gap-4 justify-center text-2xl">
          {Object.keys(Radicals).map((raidcal) => {
            return <div key={raidcal}>{raidcal}</div>;
          })}
        </div>
      </main>
    </>
  );
}
