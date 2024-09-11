"use client";

import { useState } from "react";

interface FloatingEmoji {
  id: number;
  emoji: string;
}

export default function Tips() {
  const [floatingEmojis, setFloatingEmojis] = useState<
    FloatingEmoji[]
  >([]);

  const handleEmojiClick = (emoji: string) => {
    const newEmoji: FloatingEmoji = {
      id: Date.now(),
      emoji,
    };

    setFloatingEmojis((prev) => [...prev, newEmoji]);

    setTimeout(() => {
      setFloatingEmojis((prev) =>
        prev.filter((item) => item.id !== newEmoji.id)
      );
    }, 2000);
  };

  return (
    <section className="mt-8 pt-32 bg-[#C4D6E8] h-3/6 text-gray-800 p-8">
      <div className="container h1/4 mx-auto">
        <section className="flex  ">
          <h2 className="text-3xl font-bold text-lavender-600">
            Ace Your Interview with Dr. Carrie Graham's Tips
          </h2>
          <p className="text-gray-700 text-xl mt-2">
            Discover how to make a lasting impression and land your
            dream job.
          </p>
        </section>
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-green-800">
              Stay Positive
            </h3>
            <p>
              Positivity can significantly impact your interview
              outcome. Remember to smile and maintain a confident
              demeanor.
            </p>
          </div>
          <div className="bg-purple-100 border-l-4 border-purple-500 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-purple-800">
              Prepare Your Answers
            </h3>
            <p>
              Consider potential questions and practice your responses
              to convey confidence and preparedness.
            </p>
          </div>
          <div className="bg-pink-100 border-l-4 border-pink-500 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-pink-800">
              Dress Appropriately
            </h3>
            <p>
              First impressions matter. Dressing appropriately can
              help set the tone for a successful interview.
            </p>
          </div>
        </div>
        <div id="app" className="bg-gray-200 dark:bg-gray-900 ">
          <div className="inner max-h-full flex flex-col items-center justify-center mt-0 ">
            <div className="help-text w-full text-sm text-gray-500 text-right">
              <span className="block py-2 pr-2 pb-2">
                💡 Tap on the player to send emojis
              </span>
            </div>
            <div className="relative aspect-video">
              <video
                id="video-player"
                playsInline
                controls
                className="max-h-screen rounded-lg bg-black mx-auto h-4/6 my-5"
                src="/mockai_vid.mp4"
              />

              {floatingEmojis.map((item) => (
                <span
                  key={item.id}
                  className="floating-emoji absolute left-1/2 transform -translate-x-1/2"
                >
                  {item.emoji}
                </span>
              ))}
              <div className="flex justify-center">
                <ul className="emojis flex flex-wrap justify-center rounded-full bg-gray-200 dark:bg-gray-800 shadow-[8px_8px_16px_#d6d6d6,-8px_-8px_16px_#fcfcfc] dark:shadow-[8px_8px_16px_#151a23,-8px_-8px_16px_#1d232f] w-auto md:w-auto p-4 ">
                  <li>
                    <button
                      className="emoji-btn mx-auto w-16 h-16 bg-transparent mx-1 text-3xl text-center rounded-full border-4 border-transparent transform transition-all duration-150 ease-in-out focus:outline-none hover:scale-110 hover:border-orange-400 hover:bg-white/40 active:scale-90"
                      data-id="star"
                      onClick={() => handleEmojiClick("🌟")}
                    >
                      🌟
                    </button>
                  </li>
                  <li>
                    <button
                      className="emoji-btn w-16 h-16 bg-transparent mx-1 text-3xl text-center rounded-full border-4 border-transparent transform transition-all duration-150 ease-in-out focus:outline-none hover:scale-110 hover:border-orange-400 hover:bg-white/40 active:scale-90"
                      data-id="party"
                      onClick={() => handleEmojiClick("🥳")}
                    >
                      🥳
                    </button>
                  </li>
                  <li>
                    <button
                      className="emoji-btn w-16 h-16 bg-transparent mx-1 text-3xl text-center rounded-full border-4 border-transparent transform transition-all duration-150 ease-in-out focus:outline-none hover:scale-110 hover:border-orange-400 hover:bg-white/40 active:scale-90 active:border-orange-600 active:bg-white/60"
                      data-id="clap"
                      onClick={() => handleEmojiClick("👏")}
                    >
                      👏
                    </button>
                  </li>
                  <li>
                    <button
                      className="emoji-btn w-16 h-16 bg-transparent mx-1 text-3xl text-center rounded-full border-4 border-transparent transform transition-all duration-150 ease-in-out focus:outline-none hover:scale-110 hover:border-orange-400 hover:bg-white/40 active:scale-90"
                      data-id="tada"
                      onClick={() => handleEmojiClick("🎉")}
                    >
                      🎉
                    </button>
                  </li>
                  <li>
                    <button
                      className="emoji-btn w-16 h-16 bg-transparent mx-1 text-3xl text-center rounded-full border-4 border-transparent transform transition-all duration-150 ease-in-out focus:outline-none hover:scale-110 hover:border-orange-400 hover:bg-white/40 active:scale-90"
                      data-id="love"
                      onClick={() => handleEmojiClick("💙")}
                    >
                      💙
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
