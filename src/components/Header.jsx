import { useState } from 'react';

const Header = () => {
    const [isBlacklistOpen, setIsBlacklistOpen] = useState(false);
    return (
        <div className="w-full h-10 items-center flex flex-row justify-center md:justify-between p-10">
            <div>
                <h1 className="font-bold text-lg">The Pomodoro Technique</h1>
            </div>
        </div>
    );
};

export default Header;