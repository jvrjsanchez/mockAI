import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2">
          <h1 className="text-4xl font-bold">MockAI</h1>
          <p className="text-lg">A behavioral mock interview API powered by AI.</p>
        </div>
      </div>  
      <div> 
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2">
          <h2 className="text-4xl font-bold">Enter Your Interview Confidently</h2>
          <p className="text-lg">MockAI helps you prepare for your next interview by providing feedback on your responses.</p>
        </div>       
      </div>;
      <div>
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2">
          <h2 className="text-4xl font-bold">Get Started</h2>
          <p className="text-lg">Click on the Start Inerview button to begin your session.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start Interview</button>
        </div>
      </div>
    </main>
  );
}
