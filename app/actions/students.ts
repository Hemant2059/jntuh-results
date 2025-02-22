// students.ts
"use server";

const BASE_URL = "https://api-jntuh.up.railway.app";

async function fetchResult(url: string, cache: RequestCache = "default") {
  try {
    const response = await fetch(url, { cache });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, error: errorMessage };
  }
}

export async function semResult(formData: FormData) {
  const hallticket = formData.get("hallticket")?.toString().trim();
  const semester = formData.get("semester")?.toString().trim();

  if (!hallticket || !semester) {
    return { success: false, error: "Invalid input: Hallticket and Semester are required" };
  }

  const url = `${BASE_URL}/sem?htno=${encodeURIComponent(hallticket)}&sem=${encodeURIComponent(semester)}`;
  return await fetchResult(url, "force-cache");
}

export async function academicResult(formData: FormData) {
  const hallticket = formData.get("hallticket")?.toString().trim();

  if (!hallticket) {
    return { success: false, error: "Invalid input: Hallticket is required" };
  }

  const url = `${BASE_URL}/academic?htno=${encodeURIComponent(hallticket)}`;
  const result = await fetchResult(url);

  if (result.success) {
    const transformedResult = transformResultData(result.data);
    return { success: true, data: transformedResult };
  }

  return result;
}

function transformResultData(data: any) {
  const transformedResults: Record<string, any> = {};

  data.results.forEach((sem: Record<string, any>) => {
    const [semesterKey, semesterData] = Object.entries(sem)[0];
    transformedResults[semesterKey] = semesterData;
  });

  return {
    Details: data.Details,
    Result: transformedResults,
  };
}

// The rest of the code remains unchanged.
