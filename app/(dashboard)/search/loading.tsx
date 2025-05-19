import Grid from '@/components/grid';

export default function Loading() {
  return (
    <>
    <div className="mx-auto max-w-screen-2xl flex gap-4 p-3 text-black dark:text-white md:flex-row md:col-span-5">     
      <div className="hidden order-first w-full md:block md:max-w-[255px] self-start sticky top-0 col-span-1 animate-pulse bg-neutral-100 dark:bg-neutral-900">
      </div>
      <div className="order-last min-h-[70vh] w-full md:order-none col-span-4">
        <Grid className="grid-cols-2 lg:grid-cols-4">
          {Array(12)
            .fill(0)
            .map((_, index) => {
              return (
                <Grid.Item key={index} className="animate-pulse bg-neutral-100 dark:bg-neutral-900" />
              );
            })}
        </Grid>
      </div>
      </div>
    </>
  );
}
