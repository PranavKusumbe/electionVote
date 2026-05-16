export interface ElectionStep {
  id: string;
  title: string;
  description: string;
  date: string;
  isCompleted?: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  role: string;
  platform: string;
  keyPoints: string[];
  color: string;
}

export const ELECTION_TIMELINE: ElectionStep[] = [
  {
    id: '1',
    title: 'Voter Registration',
    description: 'Ensure you are on the electoral roll. Use the NVSP portal to register or update details.',
    date: 'Ongoing / Year-round',
    isCompleted: true
  },
  {
    id: '2',
    title: 'Election Notification',
    description: 'The Election Commission of India (ECI) announces dates for various phases.',
    date: 'March - April',
    isCompleted: true
  },
  {
    id: '3',
    title: 'Phase-wise Polling',
    description: 'Lok Sabha elections are held in multiple phases across states and UTs.',
    date: 'April - May',
    isCompleted: false
  },
  {
    id: '4',
    title: 'Counting of Votes',
    description: 'The final results are declared after all EVMs and VVPATs are processed.',
    date: 'June 4th (Tentative)',
    isCompleted: false
  },
  {
    id: '5',
    title: 'Formation of Government',
    description: 'The winning coalition or party forms the new cabinet and the PM is sworn in.',
    date: 'June',
    isCompleted: false
  }
];

export const CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'National Governance Alliance',
    party: 'NGA',
    role: 'Coalition Lead',
    platform: 'Focus on infrastructure development, digital India, and economic self-reliance (Atmanirbhar).',
    keyPoints: [
      'Gati Shakti infrastructure projects',
      'Expansion of 5G and Digital Public Infrastructure',
      'Strengthening manufacturing through PLI schemes'
    ],
    color: 'bg-orange-600'
  },
  {
    id: '2',
    name: 'United Progress Front',
    party: 'UPF',
    role: 'Coalition Lead',
    platform: 'Emphasis on social welfare, agricultural MSP guarantees, and unemployment reduction.',
    keyPoints: [
      'Nyay scheme for direct income support',
      'Legal guarantee for MSP to farmers',
      'Right to Apprenticeship for youth'
    ],
    color: 'bg-cyan-700'
  }
];
