import OrionLogo from '/src/assets/logo_color.png'; 

const Header = () => {
    return (
        <header className="w-full h-16 bg-white shadow-md flex items-center justify-end px-6">
            <div className="flex items-center space-x-2">
                <img 
                    src={OrionLogo} 
                    alt="Orion Analytics Logo" 
                    className="h-15 w-auto" 
                />
            </div>
        </header>
    );
};

export default Header;