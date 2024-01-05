export const LoadingCard = () => {
  return (
    <div className="rounded-md border border-zinc-200 shadow-md dark:border-zinc-800">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="animate-pulse bg-zinc-200 dark:bg-zinc-700" />
      </div>
      <div className="flex flex-col space-y-5 p-4">
        <div className="flex flex-row justify-between text-sm">
          <div className="h-4 w-1/2 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-4 w-1/3 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
        </div>
        <div className="flex flex-row space-x-3">
          <div className="h-6 w-2/3 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
    </div>
  );
};
