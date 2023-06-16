import { Link, useNavigate } from "react-router-dom";
import {useState, ChangeEvent} from "react"

interface newData{
    name: string,
    description: string,
    isActive: boolean,
}
export function NewPage(){
    const navigate = useNavigate()
    const [data, setData] = useState<newData>({
        name: "",
        description: "",
        isActive:true,
    })
    const handleInput = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
        setData((prevInput) => ({
			...prevInput,
			[e.target.name]: e.target.value,
		}));
    }
    const handleOption = (e:ChangeEvent<HTMLSelectElement>) => {
        setData((prevInput)=>({
            ...prevInput,
            [e.target.name]: e.target.value === "true"
        }))
      }
    const handleClick = async ()=>{
        const response = await fetch ("https://w19-router-production.up.railway.app/categories",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(data)
        })
        await response.json()
        navigate("/")
    }
    return (
        <div className="mx-auto w-max text-center">
            <p>Edit Category</p>
            <Link to="/">Back</Link>
            <div className="text-center flex flex-col gap-2">
                <label htmlFor="name" className="text-left">Name</label>
                <input type="text" value={data.name} className="border-solid border-[1px] border-gray-600" onChange={handleInput} name="name" id = "name"/>
                <label htmlFor="description" className="text-left">Description</label>
                <input type="text" value = {data.description} className="border-solid border-[1px] border-gray-600" onChange={handleInput} name="description" id = "description"/>
                <label htmlFor="status" className="text-left">Status</label>
                <select className="border-solid border-[1px] border-gray-600" value={String(data.isActive)} onChange={handleOption} id = "status" name="isActive">
                    <option value="true">Active</option>
                    <option value="false">Deactive</option>
                </select>
                <button className="border-[1px] border-solid border-blue-300 text-blue-300 hover:bg-blue-300 rounded-md hover:text-white" onClick={handleClick}>Submit</button>
            </div>
        </div>
    )
}