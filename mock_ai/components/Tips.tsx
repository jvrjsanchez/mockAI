export default function Tips() {
  return (
    <section className="mt-8 pt-32 bg-[#C4D6E8] h-3/6 text-gray-800 p-8">
      <div className="container h1/4 mx-auto"> {/* Wrap everything in a container for better responsiveness */}

        <section className="flex  ">
          <h2 className="text-3xl font-bold text-lavender-600">
            Ace Your Interview with Dr. Carrie Graham's Tips
          </h2>
          <p className="text-gray-700 text-xl mt-2">
            Discover how to make a lasting impression and land your dream job.
          </p>
        </section>

        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-green-800">Stay Positive</h3>
            <p>
              Positivity can significantly impact your interview outcome. Remember to
              smile and maintain a confident demeanor.
            </p>
          </div>
          <div className="bg-purple-100 border-l-4 border-purple-500 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-purple-800">Prepare Your Answers</h3>
            <p>
              Consider potential questions and practice your responses to convey
              confidence and preparedness.
            </p>
          </div>
          <div className="bg-pink-100 border-l-4 border-pink-500 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-pink-800">Dress Appropriately</h3>
            <p>
              First impressions matter. Dressing appropriately can help set the tone
              for a successful interview.
            </p>
          </div>
        </div>


        <div id="app" className="bg-gray-200 dark:bg-gray-900 ">
          <div className="inner max-h-full flex flex-col items-center justify-center mt-0 ">
            <div className="help-text w-full text-sm text-gray-500 text-right">
              <span className="block py-2 pr-2 pb-2">💡 Tap on the player to send emojis</span>
            </div>
            <div className=" aspect-video ">
            
              <video id="video-player" playsInline controls className="max-h-screen rounded-lg bg-black mx-auto h-4/6 my-5" src="/mockai_vid.mp4"/>
              <div className="flex justify-center">
              <ul className="emojis flex justify-center rounded-full bg-gray-200 dark:bg-gray-800 shadow-[8px_8px_16px_#d6d6d6,-8px_-8px_16px_#fcfcfc] dark:shadow-[8px_8px_16px_#151a23,-8px_-8px_16px_#1d232f] w-1/12  ">
                <li>
                  <button className="emoji-btn mx-auto w-16 h-16 bg-transparent mx-1 text-3xl text-center rounded-full border-4 border-transparent transform transition-all duration-150 ease-in-out focus:outline-none hover:scale-110 hover:border-orange-400 hover:bg-white/40 active:scale-90" data-id="star">🌟</button>
                </li>
                <li>
                  <button className="emoji-btn w-16 h-16 bg-transparent mx-1 text-3xl text-center rounded-full border-4 border-transparent transform transition-all duration-150 ease-in-out focus:outline-none hover:scale-110 hover:border-orange-400 hover:bg-white/40 active:scale-90" data-id="100">💯</button>
                </li>
                <li>
                  <button className="emoji-btn w-16 h-16 bg-transparent mx-1 text-3xl text-center rounded-full border-4 border-transparent transform transition-all duration-150 ease-in-out focus:outline-none hover:scale-110 hover:border-orange-400 hover:bg-white/40 active:scale-90 active:border-orange-600 active:bg-white/60" data-id="clap">👏</button>
                </li>
                <li>
                  <button className="emoji-btn w-16 h-16 bg-transparent mx-1 text-3xl text-center rounded-full border-4 border-transparent transform transition-all duration-150 ease-in-out focus:outline-none hover:scale-110 hover:border-orange-400 hover:bg-white/40 active:scale-90" data-id="tada">🎉</button>
                </li>
                <li>
                  <button className="emoji-btn w-16 h-16 bg-transparent mx-1 text-3xl text-center rounded-full border-4 border-transparent transform transition-all duration-150 ease-in-out focus:outline-none hover:scale-110 hover:border-orange-400 hover:bg-white/40 active:scale-90" data-id="laugh">😂</button>
                </li>
              </ul>
            </div>
            </div>
            
          </div>
        </div>


        {/* <section className="flex flex-col items-center mt-12">
      <h2 className="text-2xl font-bold text-[#8a8aff] mb-4">
        Meet Dr. Carrie Graham
      </h2>
      <p className="text-base text-gray-600">
        Discover Dr. Carrie Graham's expert insights to help you embrace your
        individuality and excel in your interviews.
      </p>
      <figure className="aspect-square md:aspect-video relative max-w-xs md:max-w-xl w-96 bg-gray-800 rounded-lg shadow-lg overflow-hidden ">
  <video className="w-full h-full " controls src="/mockai_vid.mp4"></video>
  <figcaption className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 text-white text-sm p-2">
    Dr. Carrie Graham
  </figcaption>
</figure>
    </section> */}
      </div>
    </section>
    // <section className="mt-8 pt-32">
    //   <div className="container mx-auto">
    //   <div className="relative min-h-screen bg-[#C4D6E8] text-gray-800 p-8 pt-20 mt-1 mx-auto">
    //     <section className="mt-20">
    //       <h2 className="text-2xl font-semibold text-lavender-600">
    //         Ace Your Interview
    //       </h2>
    //       <p className="text-gray-700 mt-2">
    //         Discover how to make a lasting impression in your next
    //         interview with our expert tips.
    //       </p>
    //     </section>
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
    //       <div className="bg-green-100 border-l-4 border-green-500 p-4">
    //         <h3 className="font-semibold text-green-800">
    //           Stay Positive
    //         </h3>
    //         <p>
    //           Positivity can significantly impact your interviews
    //           outcome. Remember to smile and maintain a positive
    //           demeanor.
    //         </p>
    //       </div>
    //       <div className="bg-purple-100 border-l-4 border-purple-500 p-4">
    //         <h3 className="font-semibold text-purple-800">
    //           Prepare Your Answers
    //         </h3>
    //         <p>
    //           Consider potential questions and practice your responses
    //           to convey confidence and preparedness.
    //         </p>
    //       </div>
    //       <div className="bg-pink-100 border-l-4 border-pink-500 p-4">
    //         <h3 className="font-semibold text-pink-800">
    //           Dress Appropriately
    //         </h3>
    //         <p>
    //           First impressions matter. Dressing appropriately can help
    //           set the tone for a successful interview.
    //         </p>
    //       </div>
    //     </div>

    //     <section className="flex flex-col items-center p-4 ">

    //       <div className="bg-[#d7d8ea] p-4 flex flex-col items-center">

    //         <h1 className="text-2xl font-bold font-[Google Sans, 'Helvetica Neue', sans-serif]">
    //           <span className="text-[#8a8aff]">Some great tips from </span> <span className="text-[#ff8a8a]">Dr. Carrie Graham</span>
    //         </h1>
    //         <p className="text-lg text-[#6a6a6a] font-[Google Sans, 'Helvetica Neue', sans-serif]">
    //           Discover Dr. Carrie Graham’s expert insights to help you embrace your individuality and excel in your interviews.
    //         </p>
    //       </div>
    //       <section className="flex flex-col items-center mt-12">
    //   <h2 className="text-2xl font-bold text-[#8a8aff] mb-4">
    //     Meet Dr. Carrie Graham
    //   </h2>
    //   <p className="text-base text-gray-600">
    //     Discover Dr. Carrie Graham's expert insights to help you embrace your
    //     individuality and excel in your interviews.
    //   </p>
    //   <figure className="relative max-w-4xl w-full mt-4 rounded-lg shadow-lg overflow-hidden">
    //     <video className="w-full h-auto" controls src="/mockai_vid.mp4"></video>
    //     <figcaption className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 text-white text-sm p-2">
    //       Dr. Carrie Graham
    //     </figcaption>
    //   </figure>

    // </section>

    //       </section>


    //       {/* <section className="flex flex-col items-center p-4 ">

    //         <figure className="relative max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
    //           <video className="w-full h-auto" controls src="/mockai_vid.mp4"></video>
    //           <figcaption className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 text-white text-sm p-2">
    //             Dr. Carrie Graham
    //           </figcaption>
    //         </figure>
    //         <div className="mt-4 w-full max-w-4xl flex justify-center items-center space-x-4">

    //         </div>
    //       </section>


    //     </section> */}
    //   </div>
    //   </div>
    // </section>

  )
}
