import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export function RegisterForm() {
    const navigate = useNavigate()
	const [input, setInput] = useState({
		username: "",
		password: "",
	});
    const [usernameExist, setUsernameExist] = useState(false)

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInput((prevInput) => ({
			...prevInput,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:4000/user/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: input.username,
					password: input.password,
				}),
			});
            if(response.ok){
                navigate("/login")
            } else if(response.status ===  409){
                setUsernameExist(true)
            }
		} catch (e) {
			console.error(e)
		}
	};

	return (
		<div className="flex h-screen justify-center items-center">
			<div className=" border-[1px] border-black border-solid px-4 py-6 text-xl">
				<p>Please Register</p>
				<form className="flex flex-col mt-6 gap-4">
					<input
						type="text"
						placeholder="Username"
						className="border-[1px] border-black border-solid p-2"
						name="username"
						value={input.username}
						onChange={handleInput}
					/>
                    {usernameExist && <span>Username Already Registered</span>}
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
						onClick={handleSubmit}
					>
						Register
					</button>
					<p className="text-center">OR</p>
					<Link to="/">
						<div className="border-[1px] border-blue-400 border-solid  hover:cursor-pointer hover:border-blue-600 duration-500">
							<p className="text-xl text-center">Login</p>
						</div>
					</Link>
				</form>
			</div>
		</div>
	);
}
