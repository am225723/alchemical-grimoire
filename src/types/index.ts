export interface User {
  id: string;
  name: string;
  progress: UserProgress;
  journalEntries: JournalEntry[];
  triggers: TriggerLog[];
  insightCrystals: number;
  completedActivities: string[];
}

export interface UserProgress {
  chaptersCompleted: number[];
  activitiesCompleted: string[];
  quizzesCompleted: string[];
  pathProgress: number;
  lastVisit: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  type: 'general' | 'inner-child' | 'shadow' | 'dream' | 'trigger';
  title: string;
  content: string;
  mood?: string;
  tags?: string[];
}

export interface TriggerLog {
  id: string;
  date: string;
  situation: string;
  emotions: EmotionEntry[];
  memories: string;
  physicalSensations: string;
}

export interface EmotionEntry {
  emotion: string;
  intensity: number;
}

export interface TimeCapsule {
  id: string;
  createdDate: string;
  openDate: string;
  letter: string;
  opened: boolean;
}

export interface Quiz {
  id: string;
  chapterId: number;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false';
  options?: string[];
  correctAnswer: string | boolean;
  explanation: string;
}

export interface Archetype {
  id: string;
  name: string;
  description: string;
  fears: string[];
  integratedPotential: string;
  imageUrl: string;
  claimed: boolean;
}

export interface DreamLog {
  id: string;
  date: string;
  title: string;
  description: string;
  characters: string[];
  symbols: string[];
  emotions: string[];
  aiQuestion?: string;
}

export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  sections: Section[];
  quiz?: Quiz;
  completed: boolean;
}

export interface Section {
  id: string;
  title: string;
  content: string;
  activities?: Activity[];
}

export interface Activity {
  id: string;
  title: string;
  type: 'journal' | 'reflection' | 'meditation' | 'exercise';
  description: string;
  completed: boolean;
}

export interface CommunityInsight {
  id: string;
  text: string;
  date: string;
  category: string;
}