import { Platform } from "react-native";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";
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
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client)

export const createUser=async(email,password,username)=>{
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountid: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

export  const signIn = async(email,password)=> {
  try {
    // const currentSession = await account.getSession('current');
    // if(currentSession){
    //    await account.deleteSession('current');
    // }
   
    const session = await account.createEmailPasswordSession(email, password);
  
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser= async()=>{
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountid", currentAccount.$id)]
    );

 
    if (!currentUser) throw Error;


    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getAllPosts = async ()=>{
  try{
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc('$createdAt')]
    )

    return posts.documents
  }catch(error){
    throw new Error(error)
  }
}

export const getLatestPosts = async ()=>{
  try{
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc('$createdAt',Query.limit(7))]
    )

    return posts.documents
  }catch(error){
    throw new Error(error)
  }
}

export const searchPosts = async (query)=>{
  try{
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search('title',query)]
    )

    return posts.documents
  }catch(error){
    throw new Error(error)
  }
}

export const getUserPosts = async (userId)=>{
  try{
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal('creator',userId)]
    )

    return posts.documents
  }catch(error){
    throw new Error(error)
  }
}

export const signOut= async ()=>{
  try{
    const session =await account.deleteSession('current')
    return session
  }catch(error){
    throw new Error(error)
  }
}

export const getFilePreview=async(fileId,type)=>{
  let fileUrl;
  try{
    if(type==='video'){
      fileUrl=storage.getFileView(config.storageId,fileId)
    }else if(type==='image'){
      fileUrl=storage.getFilePreview(config.storageId,fileId,
        2000,2000,'top',100
      )
    }else{
      throw new Error('Invalid file type')
    }

    if(!fileUrl)
      throw Error;

    return fileUrl
  }catch(error){
    throw new Error(error)
  }
}

export const uploadFile=async(file,type)=>{
  if(!file) return;

  const asset={
    name:file.fileName,
    type:file.mimeType,
    size:file.fileSize,
    uri:file.uri,
  };

  try{
    const uploadFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadFile.$id,type)
    return fileUrl
  }catch(error){
    throw new Error(error)
  }
}

export const createVideo = async (form)=>{
  try{
    const [thumbnailUrl,videoUrl]=await Promise.all(
    [uploadFile(form.thumbnail,'image'),
    uploadFile(form.video,'video')])

    const newPost= await databases.createDocument(
      config.databaseId,config.videoCollectionId,
      ID.unique(),{
        title:form.title,
        thumbnail:thumbnailUrl,
        video:videoUrl,
        prompt:form.prompt,
        creator:form.userId
      }
    )

    return newPost
  }catch(error){
    throw new Error(error)
  }
}