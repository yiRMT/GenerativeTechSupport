import Link from "next/link"

const Header = () => {
  return (
    <header className="mt-10 mb-6">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold">
          Generative Tech Support
        </h1>
        <p className="">
          powered by{' '}
          <Link href="https://openai.com" className="hover:underline" target="_blank">
            ChatGPT API
          </Link>
        </p>
      </div>
    </header>
  )
}

export default Header