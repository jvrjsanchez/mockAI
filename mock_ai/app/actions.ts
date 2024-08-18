"use server";

export async function fetchQuestions() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

    const url = `${apiUrl}/service/get_questions`;

    const response = await fetch(url);

    return response.json();
  } catch (error) {
    console.log("Error fetching questions", error);
  }
}
