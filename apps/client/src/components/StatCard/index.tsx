export default function StatCard({
  title,
  value,
  icon,
  bgColor,
  isLoading,
}: any) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${bgColor}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {isLoading ? (
          <div className="mt-1 h-7 w-12 animate-pulse rounded-md bg-gray-200"></div>
        ) : (
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        )}
      </div>
    </div>
  )
}
