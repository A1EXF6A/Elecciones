import axios from "axios";

const URI = "http://localhost:8000/api/administradores";

interface APIResponse<T = unknown> {
    success: boolean;
    data: T | null;
}

interface UserToLogin {
    credential: string
    password: string
}

interface AdminToLogin {
    userName: string
    password: string
}

const checkEmail = (email: string) => {
    const reg = /\S+@\S+\.\S+/
    return reg.test(email)
}

const loginUser = async ({ credential, password }: UserToLogin): Promise<APIResponse<{ id_use: number, vot_use: number }>> => {
    const userData = {
        userName: '',
        email: '',
        password: ''
    }

    userData.password = password

    if (checkEmail(credential)) {
        userData.email = credential
    } else {
        userData.userName = credential
    }

    try {
        const { data } = await axios.post<{
            success: boolean,
            message: string
            user: {id_use: number, vot_use: number}
        }>(`${URI}login`, userData)

        if (!data.success) {
            throw new Error(data.message);
        }

        return {
            success: data.success,
            data: data.user
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            data: null
        };
    }
}

const loginAdmin = async ({ userName, password }: AdminToLogin): Promise<APIResponse<{ id: number }>> => {
    const userData = {
        userName: '',
        password: ''
    }

    userData.password = password
    userData.userName = userName

    try {
        const { data } = await axios.post<{
            success: boolean,
            message: string
            user: { id: number }
        }>(`${URI}/login`, userData)

        if (!data.success) {
            throw new Error(data.message);
        }

        return {
            success: data.success,
            data: data.user
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            data: null
        };
    }
}

// Registro del usuario

interface UserToRegister {
    nom_use: string,
    cor_use: string,
    pas_use: string,
}

const createNewUser = async ({ nom_use, cor_use, pas_use }: UserToRegister): Promise<{ success: boolean }> => {
    const newUserData = {
        nom_use: nom_use,
        cor_use: cor_use,
        pas_use: pas_use,
    };

    try {
        const res = await axios.post<{
            success: boolean,
            message: string
        }>(`${URI}`, newUserData)

        if (!res.data.success) {
            throw new Error(res.data.message);
        }

        return {
            success: res.data.success
        }
    } catch (error) {
        console.error(error)
        return {
            success: false
        }
    }
}


export { loginUser, loginAdmin, createNewUser }