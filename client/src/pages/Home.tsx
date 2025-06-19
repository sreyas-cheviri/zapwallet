import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-100 to-blue-200 relative">
        <div className=''>

      <div className="absolute top-0 bottom-0 left-1/4 border-l border-dashed w-14   transition-all duration-300  hover:bg-blue-700  border-blue-700"></div>
      <div className="absolute top-0 bottom-0 left-2/7  w-px border-l border-dashed  border-blue-700"></div>
      <div className="absolute top-0 bottom-0 left-5/7   border-l border-dashed w-14   transition-all duration-300  hover:bg-blue-700  border-blue-700"></div>
      <div className="absolute top-0 bottom-0 left-3/4 w-px border-l border-dashed border-blue-700"></div>
      <div className="absolute left-0 right-0 top-1/4   border-t border-dashed border-blue-700"></div>
      <div className="absolute left-0 right-0 top-2/10  h-10 transition-all duration-300  hover:bg-blue-700   border-t border-dashed border-blue-700"></div>
      <div className="absolute left-0 right-0 top-[75%] h-10 transition-all duration-300  hover:bg-blue-700 border-t border-dashed border-blue-700"></div>
      <div className="absolute left-0  right-0 top-[80%]  border-t  border-dashed h-px border-blue-700"></div>
        </div>
      <div className="text-center h-screen   flex flex-col items-center justify-center px-4 ">
        <div className="flex flex-col gap-6 justify-center">
        <div>

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
       
      </div>
        <button
          onClick={handleSignup}
          className="bg-blue-800 hover:bg-blue-900 hover:shadow-xl text-sm md:text-md text-zinc-100 font-medium py-2 px-8 rounded-lg transition duration-200 shadow"
        >
          Get started
        </button>
      </div>
    </div>
  );
}
