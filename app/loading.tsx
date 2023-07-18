import Image from 'next/image'

export default function Loading() {
  
  const text = "   ".split("");

  return (
    <div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      </div>

      <div className="relative flex flex-col place-items-center ">
        <Image
          className="relative animate-bounce"
          src="/logo.png"
          alt="Next.js Logo"
          width={140}
          height={140}
          priority
        />
        <div className="fixed left-0 bottom-0 flex w-full justify-center text-[32px] from-zinc-200 pb-20 pt-16 lg:static lg:w-auto lg:p-4 animate-pulse font-mono">
          {text.map((char, idx) => (
            <span key={idx} className={char == " " ? "px-2" : ""}>
              {char}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
      </div>
    </div>
  )
}
