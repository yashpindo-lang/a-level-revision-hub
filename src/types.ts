export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  icon: string;
  color: string;
}

export interface TopicData {
  id: string;
  subject: string;
  level: 'AS' | 'A';
  topicNumber: string;
  title: string;
  description: string;
  keyTerms: string[];
  coreKnowledge: string[];
  examSkills: string[];
  commonMistakes: string[];
  practiceQuestions: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ConstellationNode {
  id: string;
  name: string;
  x: number;
  y: number;
  size: 'large' | 'medium' | 'small';
  isCompleted: boolean;
  progress: number;
}

export interface Formula {
  id: string;
  name: string;
  formula: string;
  meaning: string;
  units: string;
  example: string;
  tip: string;
}