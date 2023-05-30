import Link from "next/link"

const Footer = () => {
  return (
      <footer>
        <div className="my-4 flex flex-col items-center">
          <p>
            This project was made by{' '}
            <Link href="https://yirmt.vercel.app" className="hover:underline" target="_blank">
              Yuichiro Iwashita
            </Link>
            . This project is not affiliated with OpenAI.{' '}
            <Link href="https://github.com/yiRMT/GenerativeTechSupport" className="hover:underline" target="_blank">
              Click to see the source code.
            </Link>
          </p>
          <p>
            This project does not send any data to the server.
            All data will be saved locally in your browser.
          </p>
        </div>
      </footer>
  )
}

export default Footer