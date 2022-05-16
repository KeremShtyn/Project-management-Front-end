const BASE_URL =
"http://localhost:8080/project";

export default class ProjectService{
   


    addProject = async (pro) => {
        return fetch(BASE_URL+'/addProject',{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pro)
        }).then(response => response.json())
    }

    getAllProjects = async () => {
        return fetch(BASE_URL+"/getAll",{
            headers: {
                "Accept": "application/json"
            }
        }).then( res => res.json());
    }
}