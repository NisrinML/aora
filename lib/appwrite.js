import { Platform } from "react-native";
import { Account, Client, ID } from "react-native-appwrite";
export const config={
    endpoint:'https://cloud.appwrite.io/v1',
    platform:'com.ns.aora',
    projectId:'66d4512e0037bb49c39f',
    databaseId:'66d453d7003cff2909a2',
    userCollectionId:'66d45462000481305ef8',
    videoCollectionId:'66d454b800160e10a8e1',
    storageId:'66d4581f0005404200b5'
}

const client = new Client();
client.setEndpoint(config.endpoint)
.setProject(config.projectId)
.setPlatform(config.platform)


const account = new Account(client);

export const createUser=()=>{
    account.create(ID.unique(),'me@exapmle.com','password','Jane Doe')
.then(function(response){
    console.log(response);
},function(error){
    console.log(error)
})
}
