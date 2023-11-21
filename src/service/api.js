import { collection, query, where, getDocs, orderBy, addDoc, serverTimestamp } from "firebase/firestore"; 
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
const initGet = async (uid) => {
    const q = query(
        collection(db, "todo"),
        orderBy("createdAt", "desc"),
        where("uid", "==", uid)
    );
    const querySnapshot = await getDocs(q);
    const todos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        content: doc.data().content,
        isComplete: doc.data().isComplete,
    }));
    return todos;
};


export {addTodo,db,initGet};