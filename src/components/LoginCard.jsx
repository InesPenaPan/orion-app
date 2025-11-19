
import { useNavigate } from 'react-router-dom';
import OrionLogo from '/src/assets/logo_color.png'; 

const LoginCard = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault(); 
        navigate('/home'); 
    };

    return (
        <div className="bg-white p-10 md:p-20 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col items-center gap-6">
            
            {/* Logo */}
            <img src={OrionLogo} alt="Orion Analytics Logo" className="w-72 mb-4" />

            <form className="w-full space-y-6" onSubmit={handleLogin}>
                
                {/* "Sign In" Title */}
                <h1 className="text-3xl font-bold text-[#000B1A] tracking-tight mb-6 text-center"> Sign In </h1>
                
                {/* Username Field */}
                <div>
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2"> User </label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username or email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                                       focus:border-blue-500 transition duration-200"
                    />
                </div>

                {/* Password Field */}
                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2"> Password </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="********"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                                       focus:border-blue-500 transition duration-200"
                    />
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-[#000B1A] text-white py-3 rounded-lg font-bold text-lg 
                                     hover:bg-[#00204A] focus:outline-none focus:ring-2 focus:ring-blue-700 
                                     focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Log in
                </button>
            </form>
            
            <p className="mt-6 text-sm text-gray-600">
                <a href="#" className="text-blue-600 hover:underline">
                    Need an account?
                </a>
            </p>
        </div>
    );
};

export default LoginCard;