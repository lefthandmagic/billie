export const CREDENTIALS = [
  'LCSW', 'LMFT', 'LPC', 'LCPC', 'LMHC',
  'PhD', 'PsyD', 'MD', 'DO', 'NP', 'PA',
  'MSW', 'MFT', 'MA', 'MS',
];

export const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
];

export const CPT_CODES = [
  { code: '90791', description: 'Psychiatric diagnostic evaluation' },
  { code: '90792', description: 'Psychiatric diagnostic evaluation with medical services' },
  { code: '90832', description: 'Individual psychotherapy, 30 min' },
  { code: '90834', description: 'Individual psychotherapy, 45 min' },
  { code: '90837', description: 'Individual psychotherapy, 60 min' },
  { code: '90847', description: 'Family psychotherapy with patient, 50 min' },
  { code: '90846', description: 'Family psychotherapy without patient, 50 min' },
  { code: '90853', description: 'Group psychotherapy' },
];

export const ICD10_CODES = [
  { code: 'F32.1', description: 'Major depressive disorder, single episode, moderate' },
  { code: 'F32.9', description: 'Major depressive disorder, single episode, unspecified' },
  { code: 'F33.0', description: 'Major depressive disorder, recurrent, mild' },
  { code: 'F33.1', description: 'Major depressive disorder, recurrent, moderate' },
  { code: 'F34.1', description: 'Dysthymic disorder' },
  { code: 'F40.10', description: 'Social anxiety disorder, unspecified' },
  { code: 'F41.1', description: 'Generalized anxiety disorder' },
  { code: 'F41.9', description: 'Anxiety disorder, unspecified' },
  { code: 'F43.10', description: 'Post-traumatic stress disorder, unspecified' },
  { code: 'F43.20', description: 'Adjustment disorder, unspecified' },
  { code: 'F43.22', description: 'Adjustment disorder with anxiety' },
  { code: 'F43.23', description: 'Adjustment disorder with mixed anxiety and depressed mood' },
  { code: 'F31.9', description: 'Bipolar disorder, unspecified' },
  { code: 'F50.9', description: 'Eating disorder, unspecified' },
  { code: 'F60.3', description: 'Borderline personality disorder' },
  { code: 'F90.0', description: 'ADHD, predominantly inattentive presentation' },
  { code: 'F90.9', description: 'ADHD, unspecified' },
  { code: 'F20.9', description: 'Schizophrenia, unspecified' },
  { code: 'Z71.1', description: 'Person with feared health complaint in whom no diagnosis made' },
  { code: 'Z03.89', description: 'Encounter for observation, no diagnosis' },
];

export const PLACE_OF_SERVICE = [
  { code: '11', description: 'Office' },
  { code: '02', description: 'Telehealth / Video' },
  { code: '10', description: 'Telehealth in patient\'s home' },
];

export const TAXONOMY_CODES = [
  { code: '101YM0800X', description: 'Counselor, Mental Health' },
  { code: '101YP2500X', description: 'Counselor, Pastoral' },
  { code: '101YS0200X', description: 'Counselor, School' },
  { code: '104100000X', description: 'Social Worker' },
  { code: '1041C0700X', description: 'Social Worker, Clinical' },
  { code: '106H00000X', description: 'Marriage and Family Therapist' },
  { code: '2084P0800X', description: 'Psychiatry & Neurology, Psychiatry' },
  { code: '2084N0400X', description: 'Neuropsychiatry' },
  { code: '103T00000X', description: 'Psychologist' },
  { code: '103TA0400X', description: 'Psychologist, Addiction (Substance Use Disorder)' },
  { code: '103TC0700X', description: 'Psychologist, Clinical' },
];
