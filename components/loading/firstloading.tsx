"use client";
import Image from 'next/image'

export default function FirstLoading() {

  const text = "τensor.exchange".split("");

  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      </div>

      <div className="relative flex flex-col place-items-center ">
        <Image
          className="relative animate-bounce"
          src="/logo.png"
          alt="Tensor Exchange Logo"
          width={140}
          height={140}
          priority
        />
        <div className="fixed left-0 bottom-0 flex w-full justify-center text-[32px] from-zinc-200 pb-20 pt-16 lg:static lg:w-auto lg:p-4 animate-pulse font-mono text-buy">
          {text.map((char, idx) => (
            <span key={idx} style={{
              animation: `fadein 0.5s ease-in-out ${idx / 16}s forwards`,
              visibility: "hidden"
            }}
            className={char == " " ? "px-2" : ""}
            >
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