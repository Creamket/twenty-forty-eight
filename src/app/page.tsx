import BoardComponent from '@/components/BoardComponent'

export default function Home() {
  return (
    <div className='flex items-start justify-center min-h-screen p-3 sm:p-16 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-2 items-center sm:items-start max-w-[320px] sm:max-w-[496px]'>
        <h1 className='text-5xl font-bold '>twenty forty eight</h1>
        <BoardComponent />
      </main>
    </div>
  )
}
