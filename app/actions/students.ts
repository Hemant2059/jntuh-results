"use server"

export async function semResult(formData: FormData) {
    try{
        const hallticket = formData.get("hallticket");
        const semester = formData.get("semester");
        if (!hallticket || !semester) {
            throw new Error("Invalid input");
        }
        const response = await fetch(`https://api-jntuh.up.railway.app/sem?htno=${hallticket}&sem=${semester}`, {cache: "force-cache"});
        if (!response.ok) {
            throw new Error("Failed to fetch");
        }
        const data = await response.json();
        return {success: true, data};
    }
    catch (error) {
        if (error instanceof Error) {
            return {success: false, error: error.message};
        } else {
            return {success: false, error: "An unknown error occurred"};
        }
    }
}
export async function academicResult(formData: FormData) {
    try{
        const hallticket = formData.get("hallticket");
        if (!hallticket ) {
            throw new Error("Invalid input");
        }
        const response = await fetch(`https://api-jntuh.up.railway.app/academic?ht=${hallticket}`);
        if (!response.ok) {
            throw new Error("Failed to fetch");
        }
        const data = await response.json();
        return {success: true, data};
    }
    catch (error) {
        if (error instanceof Error) {
            return {success: false, error: error.message};
        } else {
            return {success: false, error: "An unknown error occurred"};
        }
    }
}