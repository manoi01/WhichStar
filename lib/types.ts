export type StarType = 'meteor' | 'nebula' | 'planet' | 'sun';

export interface Choice {
  text: string;
  type: StarType;
}

export interface Question {
  title: string;
  scenario: string;
  choices: Choice[];
}

export interface Result {
  icon: string;
  name: string;
  subtitle: string;
  color: string;
  description: string;
  strengths: string;
  warnings: string;
}

export type Scores = Record<StarType, number>;
