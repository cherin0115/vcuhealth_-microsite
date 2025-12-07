export interface Symptom {
    id: string;
    label: string;
    checked: boolean;
    category: 'critical' | 'minor';
}

export interface InfoCardProps {
    icon: string;
    title: string;
    description: string;
}

export interface ScriptGeneratorProps {
    selectedSymptoms: string[];
}