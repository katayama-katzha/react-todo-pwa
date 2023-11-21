import React,{useState,useEffect,useContext} from "react";
import * as Api from "../service/api";
import dig from 'object-dig';
import { signInWithGoogle,logOut } from "../service/firebase";
import { AuthContext} from "../providers/AuthProvider";

const Dashboard = () => {
    const currentUser = useContext(AuthContext);
    const [inputName,setInputName] = useState("");
    const formRender = () => {
        let dom
        if(dig(currentUser,'currentUser','uid')){
            dom = <form>
                <input placeholder="ToDoName" value={inputName} onChange={(event)=>setInputName(event.currentTarget.value)}/>
                <button type="button" onClick={()=>post()}>追加</button>
            </form>
        }else{
            dom = <button onClick={signInWithGoogle}>ログイン</button>
        }
        return dom;
    }
    const post = () =>{
        Api.addTodo(inputName,currentUser.currentUser.uid);
        setInputName("");
    };
    return(
        <div>
           {formRender()}
        </div>
    )
};

export default Dashboard;