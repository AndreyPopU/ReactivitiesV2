import axios from "axios";
import { store } from "../stores/store";
import { toast } from "react-toastify";
import { router } from "../../App/router/Routes";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

agent.interceptors.request.use(config => {
    store.uiStore.isBusy();
    return config;
})

agent.interceptors.response.use(
    async response => {
        await sleep(300);
        store.uiStore.isIdle();
        return response;
    },
    async error => {
        await sleep(300);
        store.uiStore.isIdle();

        const {status, data} = error.response;

        switch(status)
        {
            case 400: 
                if(data.errors) // Validation error
                {
                    const modalStateErrors = []; // For each field of validation we fail it gets added to the modalStateErrors
                
                    for (const key in data.errors)
                    {
                        if (data.errors[key]) modalStateErrors.push(data.errors[key]);
                    }

                    throw modalStateErrors.flat(); // Flatten to an array of strings
                }
                else toast.error(data);
            break;
            case 401: toast.error('Unauthorized'); break;
            case 404: router.navigate('/not-found'); break;
            case 500: router.navigate('/server-error', {state: {error: data}}); break;
        }

        return Promise.reject(error);
    }
);

export default agent;