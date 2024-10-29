import React, { createContext, useState, ReactNode } from 'react';

interface Transaction {
  id: number;
  amount: string;
  remainingBalance: string;
  date: string;
  type: string;
  option: string;
}

interface User {
  name: string;
  balance: number;
}

interface AppContextProps {
  transactionHistory: Transaction[];
  addTransaction: (newTransaction: Transaction) => void;
  user: User;
  updateBalance: (newBalance: number) => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]); 

  const [user, setUser] = useState<User>({
    name: 'John Doe',
    balance: 1000000, 
  });

  const addTransaction = (newTransaction: Transaction) => {
    setTransactionHistory((prevHistory) => [newTransaction, ...prevHistory]); 
  };

  const updateBalance = (newBalance: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      balance: newBalance,
    }));
  };

  return (
    <AppContext.Provider value={{ transactionHistory, addTransaction, user, updateBalance }}>
      {children}
    </AppContext.Provider>
  );
};
