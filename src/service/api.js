import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import {db} from "./firebase";

// Add a new document with a generated id.
const addTodo = async (content, uid) => {  // 引数を追加
    const docRef = await addDoc(collection(db, "todo"), {
        content: content,
        isComplete: false,
        createdAt: serverTimestamp(),
        uid: uid  // ユーザーIDも追加
    });
    console.log("Document written with ID: ", docRef.id);
};


export {addTodo,db};