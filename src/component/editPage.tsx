import { useParams, useNavigate, Link } from "react-router-dom";
import {useState, useEffect, ChangeEvent} from "react"
import { FetchData } from "./home";

export function EditPage(){
    const navigate = useNavigate()
    const {id} = useParams()
    const [name, setName] = useState<FetchData>({})

    useEffect(() => {
        const fetchItem = async () => {
          try {
            const response = await fetch(`http://localhost:4000/categories/${id}`, {
                method:"GET",
                headers:{
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await response.json();
            setName(data.message);
          } catch (error) {
            setName({})
          }
        };
        fetchItem();
      }, []);
      

      const handleInput = (e: ChangeEvent<HTMLInputElement>) =>{
        setName((prevInput) => ({
			...prevInput,
			[e.target.name]: e.target.value,
		}));
      }
      const handleOption = (e:ChangeEvent<HTMLSelectElement>) => {
        setName((prevInput)=>({
            ...prevInput,
            isActive: e.target.value === "true"
        }))
      }
      const handleClick = async () =>{
        try {
            console.log(id)
            const response = await fetch(`http://localhost:4000/categories/${id}`, {
                method:"PATCH",
                headers:{
                    "authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(name)
            });
            await response.json();
            navigate("/")
          } catch (error) {
            console.error(error)
          }
      }
    return(
        <div className="mx-auto w-max text-center">
            <p>Edit Category</p>
            <Link to="/">Back</Link>
            <div className="text-center flex flex-col gap-2">
                <label htmlFor="name" className="text-left">Name</label>
                <input type="text" value={name.name} className="border-solid border-[1px] border-gray-600" onChange={handleInput} name="name" id = "name"/>
                <label htmlFor="description" className="text-left">Description</label>
                <input type="text" value = {name.description} className="border-solid border-[1px] border-gray-600" onChange={handleInput} name="description" id = "description"/>
                <label htmlFor="status" className="text-left">Status</label>
                <select className="border-solid border-[1px] border-gray-600" value={String(name.isActive)} onChange={handleOption} id = "status">
                    <option value="true">Active</option>
                    <option value="false">Deactive</option>
                </select>
                <button className="border-[1px] border-solid border-blue-300 text-blue-300 hover:bg-blue-300 rounded-md hover:text-white" onClick={handleClick}>Submit</button>
            </div>
        </div>
    )
}