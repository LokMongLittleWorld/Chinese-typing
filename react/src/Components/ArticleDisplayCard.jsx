export default function ArticleDisplayCard({ title, content, category }) {
  return (
    <div className="relative block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex flex-row items-center justify-between mb-2">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <div className="rounded-lg bg-blue-400 p-0.5">{category}</div>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
        {content}
      </p>
    </div>
  );
}
