import axios from 'axios';

const URI = 'http://localhost:8000/api/candidatos/vote';

const updateVote = async (partido_id: number): Promise<{ success: boolean }> => {
    const voteData = {
        partido_id: partido_id
    }

    try {
        const { data } = await axios.post<{
            success: boolean,
            message: string
        }>(URI, voteData);

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