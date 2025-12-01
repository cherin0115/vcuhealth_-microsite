import React, { useState } from 'react';
import { generateDoctorScript } from '../services/geminiService';

interface ScriptGeneratorProps {
    selectedSymptoms: string[];
}

const ScriptGenerator: React.FC<ScriptGeneratorProps> = ({ selectedSymptoms }) => {
    const [script, setScript] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        const generated = await generateDoctorScript(selectedSymptoms);
        setScript(generated);
        setLoading(false);
    };

    return (
        <div className="mb-6">
            <button 
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-4 px-6 bg-olive text-white font-display text-2xl uppercase tracking-wide border-2 border-ink shadow-retro hover:shadow-retro-active hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] transition-all disabled:opacity-70 disabled:cursor-not-allowed rounded-full mb-6"
            >
                {loading ? 'Writing Script...' : 'Generate "How to Ask" Script'}
            </button>

            {script && (
                <div className="bg-white border-2 border-ink p-6 rounded-xl shadow-sm animate-fade-in relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-olive opacity-20"></div>
                    <h4 className="font-display text-xl mb-3 text-olive">Your Conversation Starter:</h4>
                    <p className="font-body italic text-lg text-gray-700 mb-4 pl-4 border-l-4 border-olive/30">
                        "{script}"
                    </p>
                    <button 
                        onClick={() => navigator.clipboard.writeText(script)}
                        className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-ink transition-colors"
                    >
                        Click to Copy
                    </button>
                </div>
            )}
        </div>
    );
};

export default ScriptGenerator;