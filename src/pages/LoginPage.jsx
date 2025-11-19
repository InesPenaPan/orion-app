
import LoginCard from '../components/LoginCard';

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-[#000B1A] flex items-center justify-center relative overflow-hidden p-4 md:p-8">
        
            {/* Background Effect */}
            <div className="fixed top-0 left-0 w-full h-full opacity-60 pointer-events-none z-0" 
                style={{ 
                    backgroundImage: 'linear-gradient(to bottom right, #1E90FF 0%, #00204A 40%, #00204A 60%, #FFD700 100%)',
                    filter: 'blur(50px)' 
                }}
            />

            {/* ---------------------------------------------------- */}
            {/* CONTENT WRAPPER: Defines max width and uses Flexbox to position items. */}
            {/* ---------------------------------------------------- */}
            <div className="relative w-full max-w-7xl flex items-center justify-around z-10">
                
                {/* TEXT CONTAINER (LEFT SIDE - DESKTOP ONLY) */}
                <div className="hidden lg:block w-2/5 text-left">
                    
                    <h2 className="text-white text-3xl lg:text-4xl tracking-tight leading-snug mb-6">
                        THE POWER OF THE STARS
                    </h2>

                    <h3 className="text-blue-300 text-xl tracking-tight mb-8">
                        Strategic Intelligence in Real Time: Data that Defines Your Next Move.
                    </h3>

                    <p className="text-gray-300 text-base max-w-lg leading-relaxed mt-4">
                        Orion Analytics is the comprehensive platform designed to transform raw data into actionable 
                        strategic intelligence. It allows our clients to gain a 360° view of their operations and 
                        markets in real time.
                    </p>

                </div>

                {/* LOGIN CARD CONTAINER (rIGHT SIDE - DESKTOP ONLY) */}
                <div className="w-full lg:w-1/3 flex justify-center">
                    <LoginCard /> 
                </div>
                
            </div>
        </div>
    );
};

export default LoginPage;