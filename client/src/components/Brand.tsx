

export default function Brand() {
  return (
    <div className="flex flex-col md:block">
          <img
            src="/wallet.svg"
            className="md:h-12 h-10 hover:cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1"
            onClick={() => { window.location.href = "/"; }}
            alt=""
          />
          <h1 className="md:text-3xl text-2xl font-semibold text-blue-800 mb-4">ZapWallet</h1>
          <p className="text-gray-600 mb-8">
            Fast . Secure . Simple
          </p>
        </div>
  )
}
