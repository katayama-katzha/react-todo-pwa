import React,{useState,useEffect,useContext} from "react";
import dig from 'object-dig';
import { signInWithGoogle,logOut } from "../service/firebase";
import { AuthContext} from "../providers/AuthProvider";

const Dashboard = () => {
    const currentUser = useContext(AuthContext);
    const formRender = () => {
        let dom
        if(dig(currentUser,'currentUser','uid')){
            dom = <form>
                <input placeholder="ToDoName"/>
                <button>追加</button>
            </form>
        }else{
            dom = <button onClick={signInWithGoogle}>ログイン</button>
        }
        return dom;
    }
    return(
        <div>
           {formRender()}
        </div>
    )
};

export default Dashboard;