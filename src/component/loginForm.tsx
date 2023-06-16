import { ChangeEvent, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, UserContextType } from "../App";

export function LoginForm() {
	const {setUser} = useContext<UserContextType>(UserContext)
    const navigate = useNavigate()
	const [input, setInput] = useState({
		username: "",
		password: "",
	});

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInput((prevInput) => ({
			...prevInput,
			[e.target.name]: e.target.value,
		}));
	};

    const handleSubmit = async (e: React.SyntheticEvent):Promise<void> =>{
        e.preventDefault()

        try{
            const response = await fetch("http://localhost:4000/user/login",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: input.username,
                    password: input.password
                })
            })
            const data = await response.json()
            setUser(input.username)
			localStorage.setItem("token", data)
            navigate("/")
        }catch(e){
            console.error(e)
        }
    }

	return (
		<div className="flex h-screen justify-center items-center">
			<div className=" border-[1px] border-black border-solid px-4 py-6 text-xl">
				<p>Please Login to Continue</p>
				<form className="flex flex-col mt-6 gap-4" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Username"
						className="border-[1px] border-black border-solid p-2"
						name="username"
						value={input.username}
						onChange={handleInput}
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						className="border-[1px] border-black border-solid p-2"
						value={input.password}
						onChange={handleInput}
					/>
					<button
						type="submit"
						className=" text-xl bg-blue-500 rounded-lg text-white py-2 hover:bg-blue-700"
					>
						Login
					</button>
					<p className="text-center">OR</p>
					<Link to="/register">
						<div className="border-[1px] border-blue-400 border-solid  hover:cursor-pointer hover:border-blue-600 duration-500">
							<p className="text-xl text-center">Register</p>
						</div>
					</Link>
				</form>
			</div>
		</div>
	);
}
