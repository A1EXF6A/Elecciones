import axios from "axios";

const updateVote = async (id_use: number, vot_use: string): Promise<{ success: boolean }> => {
    const URI = "http://localhost:8000/users/";

    const userData = {
        vot_use: vot_use
    }

    try {
        const { data } = await axios.put<{
            success: boolean,
            message: string
        }>(`${URI}${id_use}`, userData)

        if (!data.success) {
            throw new Error(data.message);
        }

        return {
            success: data.success
        }
    } catch (error) {
        console.error(error);
        return {
            success: false
        };
    }
}

export { updateVote };