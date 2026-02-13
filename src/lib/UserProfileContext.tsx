import { createContext, useContext, useState, ReactNode } from "react";

export interface HistoryEntry {
  id: string;
  dishName: string;
  createdAt: string;
  constraints: string[];
  allergies: string[];
  regionId: string | null;
}

export interface UserProfile {
  firstName: string;
  email: string;
}

interface UserProfileContextValue {
  user: UserProfile | null;
  history: HistoryEntry[];
  setUser: (user: UserProfile | null) => void;
  
  addHistoryEntry: (entry: Omit<HistoryEntry, "id" | "createdAt">) => void;
}

const UserProfileContext = createContext<UserProfileContextValue | undefined>(
  undefined,
);

interface UserProfileProviderProps {
  children: ReactNode;
}

export function UserProfileProvider({ children }: UserProfileProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const addHistoryEntry: UserProfileContextValue["addHistoryEntry"] = (
    entry,
  ) => {
    setHistory((prev) => [
      {
        ...entry,
        id: `${Date.now()}-${prev.length + 1}`,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  return (
    <UserProfileContext.Provider
      value={{
        user,
        history,
        setUser,
        addHistoryEntry,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const ctx = useContext(UserProfileContext);
  if (!ctx) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return ctx;
}

