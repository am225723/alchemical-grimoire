import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, JournalEntry, TriggerLog, TimeCapsule, DreamLog, Archetype, CommunityInsight } from '../types';


interface AppContextType {
  user: User | null;
  setUser: (user: User) => void;
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  triggers: TriggerLog[];
  addTrigger: (trigger: Omit<TriggerLog, 'id' | 'date'>) => void;
  timeCapsules: TimeCapsule[];
  addTimeCapsule: (capsule: Omit<TimeCapsule, 'id' | 'createdDate'>) => void;
  openTimeCapsule: (id: string) => void;
  dreamLogs: DreamLog[];
  addDreamLog: (dream: Omit<DreamLog, 'id' | 'date'>) => void;
  archetypes: Archetype[];
  claimArchetype: (id: string) => void;
  communityInsights: CommunityInsight[];
  addCommunityInsight: (insight: Omit<CommunityInsight, 'id' | 'date'>) => void;
  completeActivity: (activityId: string) => void;
  completeChapter: (chapterId: number) => void;
  awardCrystal: () => void;
  updatePathProgress: (progress: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [triggers, setTriggers] = useState<TriggerLog[]>([]);
  const [timeCapsules, setTimeCapsules] = useState<TimeCapsule[]>([]);
  const [dreamLogs, setDreamLogs] = useState<DreamLog[]>([]);
  const [archetypes, setArchetypes] = useState<Archetype[]>([]);
  const [communityInsights, setCommunityInsights] = useState<CommunityInsight[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('alchemical-user');
    const savedJournals = localStorage.getItem('alchemical-journals');
    const savedTriggers = localStorage.getItem('alchemical-triggers');
    const savedCapsules = localStorage.getItem('alchemical-capsules');
    const savedDreams = localStorage.getItem('alchemical-dreams');
    const savedArchetypes = localStorage.getItem('alchemical-archetypes');
    const savedInsights = localStorage.getItem('alchemical-insights');

    if (savedUser) setUserState(JSON.parse(savedUser));
    if (savedJournals) setJournalEntries(JSON.parse(savedJournals));
    if (savedTriggers) setTriggers(JSON.parse(savedTriggers));
    if (savedCapsules) setTimeCapsules(JSON.parse(savedCapsules));
    if (savedDreams) setDreamLogs(JSON.parse(savedDreams));
    if (savedArchetypes) setArchetypes(JSON.parse(savedArchetypes));
    if (savedInsights) setCommunityInsights(JSON.parse(savedInsights));
    else {
      // Initialize with default archetypes
      const defaultArchetypes: Archetype[] = [
        {
          id: 'tyrant',
          name: 'The Tyrant',
          description: 'The Tyrant archetype represents the shadow side of power and control. It emerges when we feel powerless and compensate by dominating others.',
          fears: ['Loss of control', 'Vulnerability', 'Being dominated'],
          integratedPotential: 'Healthy leadership, assertiveness, and the ability to set boundaries',
          imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400',
          claimed: false,
        },
        {
          id: 'victim',
          name: 'The Victim',
          description: 'The Victim archetype manifests when we feel helpless and believe external forces control our destiny.',
          fears: ['Taking responsibility', 'Personal power', 'Change'],
          integratedPotential: 'Empathy, compassion, and the ability to ask for help when needed',
          imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
          claimed: false,
        },
        {
          id: 'martyr',
          name: 'The Martyr',
          description: 'The Martyr sacrifices themselves for others, often to gain recognition or avoid dealing with their own needs.',
          fears: ['Being selfish', 'Not being needed', 'Self-care'],
          integratedPotential: 'Genuine service, healthy giving, and balanced self-care',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
          claimed: false,
        },
        {
          id: 'saboteur',
          name: 'The Saboteur',
          description: 'The Saboteur undermines our success and happiness, often stemming from deep-seated beliefs of unworthiness.',
          fears: ['Success', 'Happiness', 'Being seen'],
          integratedPotential: 'Healthy caution, risk assessment, and self-protection',
          imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
          claimed: false,
        },
        {
          id: 'judge',
          name: 'The Judge',
          description: 'The Judge constantly criticizes and evaluates, both ourselves and others, creating separation and shame.',
          fears: ['Being judged', 'Imperfection', 'Vulnerability'],
          integratedPotential: 'Discernment, wisdom, and healthy boundaries',
          imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
          claimed: false,
        },
        {
          id: 'rebel',
          name: 'The Rebel',
          description: 'The Rebel rejects authority and convention, sometimes to the point of self-destruction.',
          fears: ['Conformity', 'Loss of identity', 'Being controlled'],
          integratedPotential: 'Authenticity, innovation, and healthy independence',
          imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
          claimed: false,
        },
      ];
      setArchetypes(defaultArchetypes);
      localStorage.setItem('alchemical-archetypes', JSON.stringify(defaultArchetypes));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (user) localStorage.setItem('alchemical-user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('alchemical-journals', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('alchemical-triggers', JSON.stringify(triggers));
  }, [triggers]);

  useEffect(() => {
    localStorage.setItem('alchemical-capsules', JSON.stringify(timeCapsules));
  }, [timeCapsules]);

  useEffect(() => {
    localStorage.setItem('alchemical-dreams', JSON.stringify(dreamLogs));
  }, [dreamLogs]);

  useEffect(() => {
    localStorage.setItem('alchemical-archetypes', JSON.stringify(archetypes));
  }, [archetypes]);

  useEffect(() => {
    localStorage.setItem('alchemical-insights', JSON.stringify(communityInsights));
  }, [communityInsights]);

  const setUser = (newUser: User) => {
    setUserState(newUser);
  };

  const addJournalEntry = (entry: Omit<JournalEntry, 'id' | 'date'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setJournalEntries([newEntry, ...journalEntries]);
  };

  const addTrigger = (trigger: Omit<TriggerLog, 'id' | 'date'>) => {
    const newTrigger: TriggerLog = {
      ...trigger,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setTriggers([newTrigger, ...triggers]);
  };

  const addTimeCapsule = (capsule: Omit<TimeCapsule, 'id' | 'createdDate'>) => {
    const newCapsule: TimeCapsule = {
      ...capsule,
      id: Date.now().toString(),
      createdDate: new Date().toISOString(),
    };
    setTimeCapsules([...timeCapsules, newCapsule]);
  };

  const openTimeCapsule = (id: string) => {
    setTimeCapsules(
      timeCapsules.map((capsule) =>
        capsule.id === id ? { ...capsule, opened: true } : capsule
      )
    );
  };

  const addDreamLog = (dream: Omit<DreamLog, 'id' | 'date'>) => {
    const newDream: DreamLog = {
      ...dream,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setDreamLogs([newDream, ...dreamLogs]);
  };

  const claimArchetype = (id: string) => {
    setArchetypes(
      archetypes.map((archetype) =>
        archetype.id === id ? { ...archetype, claimed: !archetype.claimed } : archetype
      )
    );
  };

  const addCommunityInsight = (insight: Omit<CommunityInsight, 'id' | 'date'>) => {
    const newInsight: CommunityInsight = {
      ...insight,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setCommunityInsights([newInsight, ...communityInsights]);
  };

  const completeActivity = (activityId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        progress: {
          ...user.progress,
          activitiesCompleted: [...user.progress.activitiesCompleted, activityId],
        },
      };
      setUser(updatedUser);
      awardCrystal();
    }
  };

  const completeChapter = (chapterId: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        progress: {
          ...user.progress,
          chaptersCompleted: [...user.progress.chaptersCompleted, chapterId],
        },
      };
      setUser(updatedUser);
      awardCrystal();
    }
  };

  const awardCrystal = () => {
    if (user) {
      const updatedUser = {
        ...user,
        insightCrystals: user.insightCrystals + 1,
      };
      setUser(updatedUser);
    }
  };

  const updatePathProgress = (progress: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        progress: {
          ...user.progress,
          pathProgress: progress,
        },
      };
      setUser(updatedUser);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        journalEntries,
        addJournalEntry,
        triggers,
        addTrigger,
        timeCapsules,
        addTimeCapsule,
        openTimeCapsule,
        dreamLogs,
        addDreamLog,
        archetypes,
        claimArchetype,
        communityInsights,
        addCommunityInsight,
        completeActivity,
        completeChapter,
        awardCrystal,
        updatePathProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
