import configurations from "../configurations";
import { IUserData } from "../view/types/UserData";

class UsersService{
    async login(email: string, password: string): Promise<IUserData>{
        const response = await fetch(`${configurations.server}/api/users/login`,
            {method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        if(response.ok){
            return await response.json();
        }else{
            throw new Error(await response.text())
        }
    }

    async register(name: string, email: string, password: string): Promise<IUserData>{
        const response = await fetch(`${configurations.server}/api/users`,
            {method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })

        if(response.ok){
            return await response.json();
        }else{
            throw new Error(await response.text())
        }
    }
}

const usersService = new UsersService()
export default usersService;