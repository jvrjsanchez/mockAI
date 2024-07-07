export default function tips() {
  return (
    <div className="relative min-h-screen bg-[#fdf4ff] text-gray-800 p-8 pt-20">
      <section className="mt-20">
        <h2 className="text-2xl font-semibold text-lavender-600">
          Ace Your Interview
        </h2>
        <p className="text-gray-700 mt-2">
          Discover how to make a lasting impression in your next
          interview with our expert tips.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
        <div className="bg-green-100 border-l-4 border-green-500 p-4">
          <h3 className="font-semibold text-green-800">
            Stay Positive
          </h3>
          <p>
            Positivity can significantly impact your interview's
            outcome. Remember to smile and maintain a positive
            demeanor.
          </p>
        </div>

        <div className="bg-purple-100 border-l-4 border-purple-500 p-4">
          <h3 className="font-semibold text-purple-800">
            Prepare Your Answers
          </h3>
          <p>
            Consider potential questions and practice your responses
            to convey confidence and preparedness.
          </p>
        </div>

        <div className="bg-pink-100 border-l-4 border-pink-500 p-4">
          <h3 className="font-semibold text-pink-800">
            Dress Appropriately
          </h3>
          <p>
            First impressions matter. Dressing appropriately can help
            set the tone for a successful interview.
          </p>
        </div>
      </div>
    </div>
  );
}
