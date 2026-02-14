const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"; // Fallback for dev

console.log("API_BASE_URL configured as:", API_BASE_URL);

export async function apiRequest(path: string, method: string = "GET", body?: any) {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(`${API_BASE_URL}${path}`, options);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "An error occurred");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
