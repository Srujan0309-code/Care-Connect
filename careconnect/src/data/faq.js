export const FAQ_DATA = [
  {
    id: "q1",
    question: "How can I get support?",
    answer: "You can request healthcare support by going to the 'Support' page and filling out the patient request form. Once submitted, our NGO coordination team will review your application based on urgency and connect you with a qualified local volunteer or partner medical clinic within 2 to 24 hours.",
    keywords: ["support", "help", "request", "assistance", "program"]
  },
  {
    id: "q2",
    question: "Is the service free?",
    answer: "Yes, CareConnect is a fully registered non-profit medical NGO. All primary consulting, local volunteer visits, and medical guidance services are 100% free of charge for eligible patients in need, sponsored by corporate partners and generous donors.",
    keywords: ["free", "cost", "charge", "payment", "fee", "money"]
  },
  {
    id: "q3",
    question: "How do I become a volunteer?",
    answer: "To join our network, navigate to the 'Volunteer' page and submit the registration form. You can select your medical/non-medical skills and select your typical availability (weekdays, weekends, evenings). Our team will schedule a brief 15-minute onboarding call with you.",
    keywords: ["volunteer", "join", "sign up", "help out", "register"]
  },
  {
    id: "q4",
    question: "What documents are required?",
    answer: "For standard requests, no formal documents are needed. However, for high-urgency medical support or medication subsidies, we might request a photo of your doctor's prescription, ID proof, or recent diagnostic reports for clinical verification.",
    keywords: ["document", "id", "prescription", "paper", "verification", "required"]
  },
  {
    id: "q5",
    question: "How long will assistance take?",
    answer: "Our average response time for high-priority cases is under 120 minutes. Medium-priority requests are resolved within 24 hours, and routine/low-priority requests are addressed within 2-3 business days based on local volunteer availability.",
    keywords: ["how long", "time", "speed", "fast", "response", "delay"]
  }
];

export const getDefaultResponse = (question) => {
  const cleanQuestion = question.toLowerCase();
  for (const item of FAQ_DATA) {
    if (item.keywords.some(k => cleanQuestion.includes(k))) {
      return item.answer;
    }
  }
  return "Thank you for reaching out. That is a great question. Let me coordinate with our NGO operations team to get you a detailed answer. Is there anything else you would like to know about CareConnect's services, volunteer programs, or dashboard?";
};
