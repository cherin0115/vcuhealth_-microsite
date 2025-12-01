export interface Symptom {
    id: string;
    label: string;
    checked: boolean;
}

export interface InfoCardProps {
    icon: string;
    title: string;
    description: string;
}

export interface ScriptGeneratorProps {
    selectedSymptoms: string[];
}
