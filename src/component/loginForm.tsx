import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
export function LoginForm() {
	const [input, setInput] = useState({
		email: "",
		password: "",
	});

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInput((prevInput) => ({
			...prevInput,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className="flex h-screen justify-center items-center">
			<div className=" border-[1px] border-black border-solid px-4 py-6 text-xl">
				<p>Please Login to Continue</p>
				<form className="flex flex-col mt-6 gap-4">
					<input
						type="text"
						placeholder="Email"
						className="border-[1px] border-black border-solid p-2"
						name="email"
						value={input.email}
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
