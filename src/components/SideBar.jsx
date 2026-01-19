import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Users, UserCircle, Globe, Menu, TrendingUp, LogOut, Briefcase} from 'lucide-react'; 

const SideBar = ({ userName = "Demo User", userEmail = "user2349@gmail.com", userIcon = UserCircle, isCollapsed, toggleCollapse }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const isConfirmed = window.confirm("¿Estás seguro de que deseas cerrar la sesión?");

        if (isConfirmed) {
            navigate('/'); 
        } 
    };
    
    const menuItems = [
        { name: 'Home', icon: Home, path: '/home' },
        { name: 'My Clients', icon: Users, path: '/portfolio' },
        { name: 'All Clients', icon: Globe, path: '/allclients' }, 
        { name: 'Pipeline', icon: TrendingUp, path: '/pipeline' },
    ];

    return (
        <div 
            // Controls width: 64px when collapsed (w-16) and 256px when expanded (w-64)
            className={`
                flex flex-col h-screen 
                bg-[#061a35] text-white 
                shadow-2xl transition-all duration-300 ease-in-out
                ${isCollapsed ? 'w-16' : 'w-64'}
            `}
        >
            {/* COLLAPSE BUTTON */}
            <div className={`p-4 flex items-center ${isCollapsed ? 'justify-end' : 'justify-end'}`}>
                <button onClick={toggleCollapse} className="p-1 rounded-full hover:bg-[#0a407a] transition-colors group" title={isCollapsed ? "Expand" : "Collapse"}>
                    <Menu 
                            className="w-5 h-5 text-white group-hover:text-[#FFD700] transition-colors duration-300" 
                    />
                </button>
            </div>

            {/* USER SECTION */}
            <div 
                className={` flex items-center mb-4                     
                    ${isCollapsed 
                        ? 'justify-center' 
                        : 'flex-col justify-center space-y-2'
                    }`}
            >
                <UserCircle className="w-12 h-12 text-yellow-500" /> 
                
                {!isCollapsed && (
                    <div className="flex flex-col items-center">
                        <span className="text-base font-bold text-white leading-tight mb-0.5"> {userName} </span>
                        <span className="text-xs text-gray-300"> {userEmail} </span>
                    </div>
                )}
            </div>

            {/* MENU OPTIONS */}
            <nav className="flex-grow p-2 space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => 
                            `flex items-center rounded-lg py-2 transition-colors duration-200 
                            ${isCollapsed ? 'justify-center' : 'px-3'}
                            ${isActive 
                                ? 'bg-[#1E90FF] text-white shadow-xl shadow-[#1E90FF]/20 font-bold' 
                                : 'text-gray-300 hover:bg-[#073566] hover:text-white' 
                            }`
                        }
                    >
                        <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
                        
                        {!isCollapsed && (
                            <span className="font-medium">{item.name}</span>
                        )}
                    </NavLink>
                ))}
            </nav>
            
            {!isCollapsed && (
                <div className={`p-4 mt-auto flex flex-col space-y-2`}>
                    
                    {/* Company Name/Branding */}
                    <div className={`flex items-center text-gray-400 px-1`}>
                        <Briefcase className={`w-4 h-4 mr-3`} /> 
                        <span className="text-sm">CRM Analytics Corp.</span> 
                    </div>
                </div>
            )}

            {/* Logout */}
            <div className={`w-full flex ${isCollapsed ? 'justify-center' : 'justify-end pr-3'} pb-4`}> 
                <button 
                    onClick={handleLogout}
                    className={`
                        flex items-center rounded-lg transition-colors duration-200 
                        py-1 px-2 text-sm text-red-300 
                        hover:bg-[#A52A2A] hover:text-white 
                        hover:shadow-lg 
                        ${isCollapsed ? 'justify-center' : ''}
                    `}
                    title="Logout"
                >
                    {!isCollapsed && (
                        <span className="font-medium mr-2">Logout</span>
                    )}
                    
                    <LogOut className={`w-4 h-4 ${isCollapsed ? '' : ''}`} /> 
                </button>
            </div>

        </div>
    );
};

export default SideBar;