import { UserContext, UserContextType } from "../App";
import {useContext, useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";

export interface FetchData{
    id?: number,
    name?: string,
    description?: string,
    isActive?: boolean,
    usersID?: number
}

export function Home(){

    const {user} = useContext<UserContextType>(UserContext)
    const [item, setItem] = useState<FetchData[]>([{}])
    const [deleteCount, setDeleteCount] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchItem = async () => {
          try {
            const response = await fetch("https://w19-router-production.up.railway.app/categories", {
                headers:{
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await response.json();
            setItem(data.message.message);
          } catch (error) {
            setItem([{}])
          }
        };
        fetchItem();
      }, [deleteCount]);

      const editButton = (id: string)=>{
        navigate(`/edit/${id}`)
      }
      const deleteButton = async (id:string)=>{
        const response = await fetch(`https://w19-router-production.up.railway.app/categories/${id}`, {
          method:"DELETE",
          headers:{
              "authorization": `Bearer ${localStorage.getItem("token")}`,
          }
      });
      await response.json();
      setDeleteCount((prevKey) => prevKey + 1)
      }
    return (
        <div className="w-max mx-auto text-center">
          <h1>Hi {user}</h1>
          <p>List Of Category</p>
          <Link to="/new" className="w-full text-left underline block">
            <span>Add New Item</span>
          </Link>
          <table className="min-w-[1280px]">
            <thead>
              <tr className="b border-grey-500 border-[1px] border-solid">
                <td>ID</td>
                <td>Name</td>
                <td>Description</td>
                <td>Status</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {
                  item.map((element, index)=>{return(
                    <tr key={index} className="b border-grey-500 border-[1px] border-solid">
                      <td>{element.id}</td>
                      <td>{element.name}</td>
                      <td>{element.description}</td>
                      <td>{element.isActive? "Active": "Deactive"}</td>
                      <td>
                        <button className="bg-blue-400 w-1/5 rounded-md py-2 text-white" onClick={()=>editButton(String(element.id))}>Edit</button>
                        <button className="w-1/5 rounded-md py-2 text-red-400 border-red-400 border-solid border-[1px]" onClick={()=>deleteButton(String(element.id))}>Delete</button>
                      </td>
                    </tr>
                      )})
              }
              </tbody>
            </table>
        </div>
    )
}