// Local Storage utility for CareConnect

const PATIENTS_KEY = 'careconnect_patients';
const VOLUNTEERS_KEY = 'careconnect_volunteers';

// Mock Patient Requests
const mockPatients = [
  {
    id: 'p1',
    fullName: 'Sarah Jenkins',
    age: 68,
    phoneNumber: '+1 (555) 123-4567',
    email: 'sarah.jenkins@example.com',
    healthConcern: 'Need post-operative care guidance and wound dressing assistance after hip replacement surgery.',
    location: 'Chicago, IL',
    urgency: 'high',
    additionalNotes: 'Patient discharged yesterday, needs daily follow-up.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
  },
  {
    id: 'p2',
    fullName: 'Mark Thompson',
    age: 45,
    phoneNumber: '+1 (555) 987-6543',
    email: 'mark.t@example.com',
    healthConcern: 'Mobility assistance and prescription delivery. Diagnosed with advanced rheumatoid arthritis.',
    location: 'Seattle, WA',
    urgency: 'medium',
    additionalNotes: 'Requires help twice a week in the mornings.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString() // 10 hours ago
  },
  {
    id: 'p3',
    fullName: 'Elena Rodriguez',
    age: 29,
    phoneNumber: '+1 (555) 246-8101',
    email: 'elena.r@example.com',
    healthConcern: 'Nutrition setup and dietary consultation for newly diagnosed Gestational Diabetes.',
    location: 'Miami, FL',
    urgency: 'low',
    additionalNotes: 'Prefers remote consultation if possible.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
  },
  {
    id: 'p4',
    fullName: 'David Wu',
    age: 34,
    phoneNumber: '+1 (555) 135-7913',
    email: 'david.wu@example.com',
    healthConcern: 'Severe anxiety and mental health support. Needs urgent counseling referral.',
    location: 'Seattle, WA',
    urgency: 'high',
    additionalNotes: 'Prefers female counselor. Speaks Mandarin and English.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString() // 1.5 days ago
  },
  {
    id: 'p5',
    fullName: 'John Miller',
    age: 72,
    phoneNumber: '+1 (555) 321-4321',
    email: 'john.m@example.com',
    healthConcern: 'Blood pressure monitoring and medication adjustment consultation.',
    location: 'Houston, TX',
    urgency: 'medium',
    additionalNotes: 'Needs assistance with digital BP monitor.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() // 2 days ago
  },
  {
    id: 'p6',
    fullName: 'Amara Diop',
    age: 5,
    phoneNumber: '+1 (555) 654-7890',
    email: 'amara.diop@example.com',
    healthConcern: 'Pediatric general health checkup and vaccination advice.',
    location: 'Seattle, WA',
    urgency: 'high',
    additionalNotes: 'Mother is seeking guidance on standard vaccine schedules.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() // 4 hours ago
  }
];

// Mock Volunteers
const mockVolunteers = [
  {
    id: 'v1',
    fullName: 'James Carter',
    email: 'james.c@example.com',
    phone: '+1 (555) 765-4321',
    skills: 'Nursing, EMT, First Aid',
    availability: 'weekends',
    city: 'Denver, CO',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() // 3 days ago
  },
  {
    id: 'v2',
    fullName: 'Linda Chen',
    email: 'linda.chen@example.com',
    phone: '+1 (555) 876-5432',
    skills: 'Counseling, Psychology',
    availability: 'evenings',
    city: 'Portland, OR',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() // 5 days ago
  },
  {
    id: 'v3',
    fullName: 'Robert Moore',
    email: 'robert.m@example.com',
    phone: '+1 (555) 987-1234',
    skills: 'Elderly Care, General Admin',
    availability: 'weekdays',
    city: 'Austin, TX',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString() // 7 days ago
  },
  {
    id: 'v4',
    fullName: 'Emma Watson',
    email: 'emma.w@example.com',
    phone: '+1 (555) 124-5678',
    skills: 'First Aid, Logistics, General Admin',
    availability: 'flexible',
    city: 'Seattle, WA',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() // 2 days ago
  }
];

export const getPatients = () => {
  const data = localStorage.getItem(PATIENTS_KEY);
  if (!data) {
    localStorage.setItem(PATIENTS_KEY, JSON.stringify(mockPatients));
    return mockPatients;
  }
  return JSON.parse(data);
};

export const savePatient = (patient) => {
  const patients = getPatients();
  const newPatient = {
    ...patient,
    id: 'p_' + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString()
  };
  patients.unshift(newPatient); // Add to the top
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));
  return newPatient;
};

export const getVolunteers = () => {
  const data = localStorage.getItem(VOLUNTEERS_KEY);
  if (!data) {
    localStorage.setItem(VOLUNTEERS_KEY, JSON.stringify(mockVolunteers));
    return mockVolunteers;
  }
  return JSON.parse(data);
};

export const saveVolunteer = (volunteer) => {
  const volunteers = getVolunteers();
  const newVolunteer = {
    ...volunteer,
    id: 'v_' + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString()
  };
  volunteers.unshift(newVolunteer); // Add to the top
  localStorage.setItem(VOLUNTEERS_KEY, JSON.stringify(volunteers));
  return newVolunteer;
};
