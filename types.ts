export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export enum SubjectType {
  PHYSICS = '物理',
  CHEMISTRY = '化學',
  MATH_A = '數甲',
  BIOLOGY = '生物',
  HISTORY = '歷史',
  GEOGRAPHY = '地理',
  CIVICS = '公民',
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}
