import axios from "axios";

export const api = axios.create({
    baseURL: "https://servisim-api2.herokuapp.com"
});


///Rotas Usuario
export const createSession = async(email:string)=>{
    return api.get(`/usuario/${email}`);
};

export const deleteUser = async(id:string)=>{
    return api.delete(`/usuario/${id}`)
}

export const updateUser = async(id:string)=>{
    return api.put(`/usuario-update/${id}`)
}

export const list_user = async()=>{
    return api.get(`/usuario_lista`)
}

export const logoutt = async()=>{
    return api.post(`/usuario/logout`)
}

///Rotas Provedor
export const createServidorSession = async(email:string)=>{
    return api.get(`/services-provider/${email}`);
};

export const getServicesProvider = async(id:string)=>{
    return api.get(`/services-provider`)
}

export const getID = async(id:string)=>{
    return api.get(`/services-provider-home/${id}`)
}

export const updateProvider = async(id:string)=>{
    return api.put(`/services-update/${id}`)
}

///Rotas Comentários
export const getComments = async()=>{
    return api.get(`/post`)
}
export const getCommentsById = async(id_provedor:string)=>{
    return api.get(`/post/${id_provedor}`)
}

export const addComments = async(commentsData:any, token:any)=>{
    return api.post(`/post_add`,commentsData , {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
}

///Rotas Serviços
export const getServices = async()=>{
    return api.get(`/service`)
}
export const getServicesByClientId = async(id:string)=>{
    return api.get(`/service_client/${id}`)
}

export const getServicesByProviderId = async(id:string)=>{
    return api.get(`/service_provider/${id}`)
}

export const addServices = async(data:any)=>{
    return api.post(`/service`, data )
}

export const deleteServices = async(id:any, token:any)=>{
    return api.delete(`/service_delete/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
}
export const deleteServices2 = async(id:any, token:any)=>{
    return api.delete(`/service_delete_2/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
}

export const updateServices = async(id:any, data:any)=>{
    return api.put(`/service-update/${id}`, data)
}