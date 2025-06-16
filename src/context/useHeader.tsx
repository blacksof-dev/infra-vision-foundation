'use client'
import { ReactNode, useContext, useState, createContext } from "react";

interface HeaderContextType {
    isHeaderVisible: boolean;
    setIsHeaderVisible: (value: boolean) => void;
}

const HeaderContext = createContext<HeaderContextType>({
    isHeaderVisible: true,
    setIsHeaderVisible: () => { },
});

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
    const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(false)
    return <HeaderContext.Provider
        value={{
            isHeaderVisible,
            setIsHeaderVisible
        }}
    >
        {children}
    </HeaderContext.Provider>
};

export const useHeader = () => {
    const context = useContext(HeaderContext);
    if (!context) throw Error('Header context  must be used inside Header Provider');
    return context;
}