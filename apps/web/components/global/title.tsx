export const Title = ({
  title,
  subTitle,
}: {
  title: string
  subTitle: string
}) => {
  return (
    <div className="flex flex-col gap-2 text-center">
      <h1 className="font-heading text-3xl font-semibold lg:text-4xl">
        {title}
      </h1>
      <p className="text-slate-600 dark:text-slate-400">{subTitle}</p>
    </div>
  )
}
