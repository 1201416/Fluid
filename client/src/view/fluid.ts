import { SharedMap } from "@fluidframework/map";
import { AzureClientProps, AzureRemoteConnectionConfig,AzureLocalConnectionConfig, IUser} from "@fluidframework/azure-client"
import { InsecureTokenProvider } from "@fluidframework/test-runtime-utils"
import { IUserData } from "./types/UserData";
import { uuidv4 } from "./utils";

export const useAzure = "azure";
export const tenantId = "ce6aea34-ec90-4574-b685-0ce8edae1dbf";
export const tokenProvider = "b0de38d2f20929c7a92cb3e826e52c39";
export const containerSchema = {
    initialObjects: {
        entries: SharedMap
    }
}

export const createConnectionConfig = (user: IUserData): AzureClientProps => {
    const userI = {
        id: uuidv4(),
        name: user.userDTO.name
    }
    const connectionConf: AzureRemoteConnectionConfig = {
        tenantId: tenantId,
        tokenProvider: new InsecureTokenProvider(tokenProvider, userI),
        endpoint: "https://eu.fluidrelay.azure.com",
        type: "remote"
    };

    const connectionConf2: AzureLocalConnectionConfig = {
        tokenProvider: new InsecureTokenProvider("goofball", userI),
        endpoint: "http://localhost:3000",
        type: "local"
    };
    return useAzure ? { connection: connectionConf } : { connection: connectionConf2 };
};