export default function Team() {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Header Section */}
        <header className="bg-blue-500 p-4 text-center">
          <h1 className="text-white text-2xl">Our Amazing Team</h1>
        </header>
  
        {/* Main Content Section */}
        <main className="flex-grow">
          <section className="mt-8 pt-16 bg-[#0a0b2e] h-full text-gray-800 p-8">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center text-white mb-8">
                Meet Our Team
              </h2>
  
              <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {/* Team Member 1 */}
                <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg text-center">
                <img
                    style={{ width: '200px', height: '200px' }} // Adjust these values as needed
                    className="rounded-full mx-auto mb-4"
                    src="/profile_pics/javier.jpeg"
                    alt="Javier Sanchez"
                />

                  <h3 className="font-semibold text-xl">Javier Sanches</h3>
                  <p className="text-gray-600">Product Owner / Technical Lead</p>
                  <a
                    href="https://github.com/jvrjsanchez"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <br />
                  <a
                    href="https://www.linkedin.com/in/jvrjsanchez/"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
  
                {/* Team Member 2 */}
                <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg text-center">
                <img
                    style={{ width: '200px', height: '200px' }} // Adjust these values as needed
                    className="rounded-full mx-auto mb-4"
                    src="/profile_pics/wesley2.png"
                    alt="Wesley Brown"
                />

                  <h3 className="font-semibold text-xl">Wesley Brown</h3>
                  <p className="text-gray-600">UX/UI Testing, QA Lead</p>
                  <a
                    href="https://github.com/wesleykebrown"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <br />
                  <a
                    href="https://www.linkedin.com/in/wesleykebrown/"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
  
                {/* Team Member 3 */}
                <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg text-center">
                <img
                    style={{ width: '200px', height: '200px' }} // Adjust these values as needed
                    className="rounded-full mx-auto mb-4"
                    src="/profile_pics/kevin.jpeg"
                    alt="Kevin Kamerling"
                />

                  <h3 className="font-semibold text-xl">Kevin Kamerling</h3>
                  <p className="text-gray-600">Flex Contributor / Documentation</p>
                  <a
                    href="https://github.com/slimkevo"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <br />
                  <a
                    href="https://www.linkedin.com/in/kevinkamerling/"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
  
                {/* Team Member 4 */}
                <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg text-center">
                <img
                    style={{ width: '200px', height: '200px' }} // Adjust these values as needed
                    className="rounded-full mx-auto mb-4"
                    src="/profile_pics/tim.jpeg"
                    alt="Tim Quattrochi"
                />

                  <h3 className="font-semibold text-xl">Tim Quattrochi</h3>
                  <p className="text-gray-600">Technical Lead / Documentation</p>
                  <a
                    href="https://github.com/Tim-Quattrochi"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <br />
                  <a
                    href="https://www.linkedin.com/in/timquattrochi/"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </section>
  
          {/* About Section */}
          <section className="mt-16 bg-[#0a0b2e] p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
              About MockAI
            </h2>
            <p className="text-lg text-white">
              MockAI is designed to support individuals who face challenges with public speaking and interviews. We understand that anxiety often makes it difficult to perform well in high-stakes situations like job interviews. Our goal is to help users build confidence and develop the necessary skills to excel in these moments.
            </p>
            <p className="text-lg text-white mt-4">
              With MockAI, users can practice answering common behavioral interview questions while receiving personalized feedback from Gemini, our AI. This intelligent system analyzes responses for repeated words, long pauses, and other areas for improvement. The detailed feedback provided by Gemini helps users refine their answers, enhance their communication skills, and ultimately succeed in interviews.
            </p>
            <p className="text-lg text-white mt-4">
              We're excited to be part of your journey toward overcoming interview anxiety and becoming a confident speaker.
            </p>
          </section>
        </main>
      </div>
    );
  }
  