import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Users, Clock, Package, Home } from 'lucide-react';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeModule, setActiveModule] = useState('main');

    const menuItems = [
        { id: 'main', label: 'Home', icon: Home, path: '/main' },
        //{ id: 'extra-hours', label: 'Extra Hours', icon: Clock, path: '/users-extra-hours' },
        { id: 'employees', label: 'Employees', icon: Users, path: '/employees' },
        { id: 'products', label: 'Products', icon: Package, path: '/products' }
    ];

    const handleMenuClick = (path, id) => {
        setActiveModule(id);
        navigate(path, { replace: true });
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white">
                <div className="p-4">
                    <h2 className="text-xl font-bold">Amadeus</h2>
                </div>
                <nav className="mt-4">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleMenuClick(item.path, item.id)}
                            className={`w-full flex items-center p-4 hover:bg-gray-700 transition-colors
                ${activeModule === item.id ? 'bg-gray-700' : ''}`}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div>
    );
};

export default Layout;