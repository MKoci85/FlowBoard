

export default function ErrorMessage({children}: {children: React.ReactNode}) {
  return (
    <div className=' bg-red-100 uppercase p-3  text-red-600 text-center my-4 font-bold text-sm'>
      {children}
    </div>
  )
}
