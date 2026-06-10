import { getPatients, getVolunteers } from './localStorage';

export const generateSummary = () => {
  const patients = getPatients();
  const volunteers = getVolunteers();

  // 1. Total Requests
  const totalRequests = patients.length;

  // 2. Most Common Concern
  const categories = [
    { name: 'Post-op Care', keywords: ['post-op', 'surgery', 'post-operative', 'hip', 'wound'] },
    { name: 'Mobility Assist', keywords: ['mobility', 'wheelchair', 'walk', 'arthritis', 'movement'] },
    { name: 'Nutrition Consultation', keywords: ['nutrition', 'diet', 'diabetes', 'food', 'meal'] },
    { name: 'Mental Health Support', keywords: ['mental', 'anxiety', 'counseling', 'depression', 'stress'] },
    { name: 'Pediatric Care', keywords: ['pediatric', 'child', 'vaccine', 'baby', 'immunization'] },
    { name: 'Geriatric Support', keywords: ['elderly', 'geriatric', 'old age', 'blood pressure'] }
  ];

  const categoryCounts = {};
  patients.forEach(p => {
    const concernText = (p.healthConcern || '').toLowerCase();
    let matched = false;
    for (const cat of categories) {
      if (cat.keywords.some(keyword => concernText.includes(keyword))) {
        categoryCounts[cat.name] = (categoryCounts[cat.name] || 0) + 1;
        matched = true;
        break;
      }
    }
    if (!matched) {
      categoryCounts['General Health Consultation'] = (categoryCounts['General Health Consultation'] || 0) + 1;
    }
  });

  let mostCommonConcern = 'General Health Consultation';
  let maxCount = 0;
  Object.keys(categoryCounts).forEach(cat => {
    if (categoryCounts[cat] > maxCount) {
      maxCount = categoryCounts[cat];
      mostCommonConcern = cat;
    }
  });

  // 3. Priority counts
  let highPriority = 0;
  let mediumPriority = 0;
  let lowPriority = 0;

  patients.forEach(p => {
    const urgency = (p.urgency || '').toLowerCase();
    if (urgency === 'high') highPriority++;
    else if (urgency === 'medium') mediumPriority++;
    else if (urgency === 'low') lowPriority++;
    else lowPriority++; // default
  });

  // 4. Latest request location
  const sortedPatients = [...patients].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const latestRequest = sortedPatients.length > 0 ? sortedPatients[0].location : 'N/A';

  // 5. Total volunteers
  const totalVolunteers = volunteers.length;

  return {
    totalRequests,
    mostCommonConcern,
    highPriority,
    mediumPriority,
    lowPriority,
    latestRequest,
    totalVolunteers
  };
};
