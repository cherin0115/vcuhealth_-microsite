
// Pre-defined scripts mapped to the exact labels used in App.tsx
const SCRIPT_TEMPLATES: Record<string, string> = {
  "Persistent Itching": "I’ve been experiencing a persistent itching feeling around my rectal area",
  
  "Changes in Bowel Habits": "I’ve been experiencing changes in my bowel habits lately",
  
  "Bleeding (Thought it was hemorrhoids?)": "I’ve been experiencing persistent bleeding in my rectal area and have ruled out hemorrhoids",
  
  "History of HPV": "I have been diagnosed with HPV and am aware of the link between HPV and Anal Cancer",
  
  "Unexplained discharge or mucus": "I have been experiencing unexplained discharge and mucus around my rectal area",
  
  "Feeling of fullness or pain in the area": "I have been experiencing a feeling of fullness and consistent pain around my rectal area",
  
  "Lumps or bumps (Not sure if it is a skin tag?)": "I have noticed some lumps and bumps around my rectal area. I have ruled out skin tags and hemorrhoids"
};

export const generateDoctorScript = async (symptoms: string[]): Promise<string> => {
  // Simulate a short delay for UI feel, though it's instant now
  await new Promise(resolve => setTimeout(resolve, 600));

  if (symptoms.length === 0) {
    return "I don't have specific urgent symptoms right now, but I am aware of the link between HPV and anal cancer. I would like to discuss scheduling an Anal Pap to be proactive about my health.";
  }

  // 1. Collect the specific "observation" parts of the script for each selected symptom
  const findings = symptoms
    .map(label => SCRIPT_TEMPLATES[label])
    .filter(Boolean); // Remove undefined if a label doesn't match

  if (findings.length === 0) {
    // Fallback if labels don't match for some reason
    return "I have some concerns about my pelvic health and would like to discuss scheduling an Anal Pap.";
  }

  // 2. Combine findings into sentences.
  const combinedFindings = findings.join('. ') + '.';

  // 3. Append the common call to action.
  return `${combinedFindings} I would like to discuss scheduling an Anal Pap.`;
};
