import { NavLink } from 'react-router-dom';
import { Home, Users, UserCircle, Globe, Menu } from 'lucide-react'; 

const Sidebar = ({ userName = "Demo User", userEmail = "user2349@gmail.com", userIcon = UserCircle, isCollapsed, toggleCollapse }) => {
    
    const menuItems = [
        { name: 'Home', icon: Home, path: '/home' },
        { name: 'My Clients', icon: Users, path: '/portfolio' },
        { name: 'All Clients', icon: Globe, path: '/allclients' }, 
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
        </div>
    );
};

export default Sidebar;