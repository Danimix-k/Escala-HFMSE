export type Score = 0 | 1 | 2;

export interface ScaleOption {
  score: Score;
  description: string;
}

export interface ScaleItem {
  number: number;
  title: string;
  initialPosition: string;
  finalPosition: string;
  instruction: string;
  patientPrompt: string;
  options: ScaleOption[];
  timerSeconds?: 3 | 10;
}

export interface DraftAssessment {
  id: string;
  scaleVersion: string;
  patientInitials: string;
  attendanceDate: string; // YYYY-MM-DD
  currentItem: number;
  responses: Partial<Record<number, Score>>;
  createdAt: string;
  updatedAt: string;
}

export interface CompletedAssessment {
  id: string;
  scaleVersion: string;
  patientInitials: string;
  attendanceDate: string;
  responses: Record<number, Score>;
  totalScore: number;
  createdAt: string;
  completedAt: string;
}

export type AppView = 
  | 'home'          // T01
  | 'assessment'    // T02
  | 'review'        // T03
  | 'result'        // T04
  | 'history'       // T05
  | 'detail'        // T06
  | 'report';       // Impressão / PDF
