
import React, { useState, useEffect, useMemo } from 'react';
import { Symptom } from '../types';

interface ChecklistProps {
    symptoms: Symptom[];
    onToggle: (id: string) => void;
    onBookAppointment: () => void;
}

const CRITICAL_PHRASES: Record<string, string> = {
    "Feeling of fullness or pain in the area": "Feeling of fullness or pain in your rectum",
    "Bleeding (Thought it was hemorrhoids?)": "bleeding around your rectum",
    "Unexplained discharge or mucus": "unexplained discharge around your rectum",
    "Lumps or bumps (Not sure if it is a skin tag?)": "lumps or bumps around your rectum"
};

const Checklist: React.FC<ChecklistProps> = ({ symptoms, onToggle, onBookAppointment }) => {
    const [showResult, setShowResult] = useState(false);
    
    // Derived state
    const checkedItems = useMemo(() => symptoms.filter(s => s.checked), [symptoms]);
    const hasCheckedItems = checkedItems.length > 0;

    // Determine status
    const resultStatus = useMemo(() => {
        if (!hasCheckedItems) return 'none';
        const hasCritical = checkedItems.some(s => s.category === 'critical');
        return hasCritical ? 'critical' : 'minor';
    }, [checkedItems, hasCheckedItems]);

    // Generate dynamic critical message content
    const criticalContent = useMemo(() => {
        const criticalItems = checkedItems.filter(s => s.category === 'critical');
        const phrases = criticalItems.map(s => CRITICAL_PHRASES[s.label] || s.label);
        
        if (phrases.length === 0) return "";
        if (phrases.length === 1) return phrases[0];
        if (phrases.length === 2) return `${phrases[0]} and ${phrases[1]}`;
        
        const last = phrases.pop();
        return `${phrases.join(', ')}, and ${last}`;
    }, [checkedItems]);

    // Reset result visibility if user unchecks everything
    useEffect(() => {
        if (!hasCheckedItems) {
            setShowResult(false);
        }
    }, [hasCheckedItems]);

    const activeSymptomsList = checkedItems
        .map(s => `- ${s.label}`)
        .join('%0D%0A'); // URL encoded new line

    const emailBody = `Hello,%0D%0A%0D%0AI have been tracking my health and wanted to discuss the following symptoms at my next visit:%0D%0A%0D%0A${activeSymptomsList}%0D%0A%0D%0AThank you.`;

    return (
        <section className="mb-12 relative z-10">
            <h2 className="text-3xl font-display uppercase text-ink border-b-4 border-burnt-orange inline-block mb-6 transform -rotate-1">
                Private Check <span className="text-burnt-orange">*</span>
            </h2>
            
            <div className="relative group">
                {/* Paper Stack Effect */}
                <div className="absolute inset-0 bg-gray-200 rounded-sm transform rotate-2 translate-x-2 translate-y-2 border border-gray-300"></div>
                
                {/* Main Paper */}
                <div className="relative bg-[#FDFBF7] border border-gray-300 p-6 rounded-sm shadow-lg min-h-[320px] transition-all duration-500">
                    
                    {/* Notebook Margin Lines */}
                    <div className="absolute top-0 bottom-0 left-8 w-px bg-red-300/50"></div>
                    <div className="absolute top-0 bottom-0 left-9 w-px bg-red-300/50"></div>

                    <div className="pl-8 relative z-10">
                        <p className="font-display text-ink/60 uppercase tracking-widest mb-6 text-sm">
                            Mark what feels familiar:
                        </p>
                        
                        <div className="space-y-4 mb-8">
                            {symptoms.map((symptom) => (
                                <label key={symptom.id} className="flex items-center cursor-pointer group/item select-none relative py-1">
                                    {/* Invisible real checkbox */}
                                    <input 
                                        type="checkbox" 
                                        className="peer sr-only" 
                                        checked={symptom.checked}
                                        onChange={() => {
                                            onToggle(symptom.id);
                                            // If adding items while result is shown, keep shown. 
                                            // If unchecking all, useEffect handles reset.
                                        }}
                                    />
                                    
                                    {/* Custom Checkbox (Round with Asterisk) */}
                                    <div className={`mt-0.5 w-7 h-7 flex-shrink-0 border-2 transition-all duration-300 ease-out flex items-center justify-center shadow-sm group-hover/item:shadow-md mr-4 rounded-full
                                        ${symptom.checked ? 'border-burnt-orange bg-burnt-orange' : 'border-ink bg-white'}
                                    `}>
                                        <span className={`text-white font-display text-3xl leading-none pt-2 transform transition-all duration-300 ${
                                            symptom.checked ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-180'
                                        }`}>
                                            *
                                        </span>
                                    </div>

                                    {/* Label Text with Animated Strikethrough */}
                                    <div className="relative">
                                        <span className={`text-2xl font-hand tracking-wide transition-colors duration-300 ${
                                            symptom.checked ? 'text-gray-400' : 'text-ink'
                                        }`}>
                                            {symptom.label}
                                        </span>
                                        
                                        {/* Animated Strikethrough Line */}
                                        <span 
                                            className={`absolute top-[55%] left-[-5%] h-[2px] bg-burnt-orange transition-all duration-500 ease-in-out rounded-full pointer-events-none
                                                ${symptom.checked ? 'w-[110%]' : 'w-0'}
                                            `} 
                                            style={{ transform: 'rotate(-2deg)', opacity: 0.7 }}
                                        />
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* INTERACTION AREA */}
                    <div className="min-h-[120px] flex items-end justify-center">
                        
                        {/* 1. "See My Results" Button (Visible only when items checked & result hidden) */}
                        {!showResult && (
                            <div className={`w-full transform transition-all duration-500 ${hasCheckedItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                                <button 
                                    onClick={() => setShowResult(true)}
                                    className="w-full bg-ink text-white font-display text-xl uppercase py-3 border-2 border-transparent shadow-retro hover:shadow-retro-active hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-gray-800 transition-all rounded-sm flex items-center justify-center gap-2"
                                >
                                    <span>See My Results</span>
                                    <span className="text-burnt-orange">▼</span>
                                </button>
                            </div>
                        )}

                        {/* 2. Result Cards (Visible only when showResult is true) */}
                        
                        {/* Critical Card */}
                        <div className={`w-full transform transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${
                            showResult && resultStatus === 'critical'
                                ? 'translate-y-0 opacity-100 rotate-0 scale-100 relative' 
                                : 'absolute translate-y-4 opacity-0 pointer-events-none scale-95'
                        }`}>
                            <div className="bg-burnt-orange p-6 shadow-md border-2 border-ink relative rounded-sm text-white">
                                <h3 className="font-display text-2xl uppercase mb-2 border-b-2 border-white/20 pb-2">Recommendation</h3>
                                <p className="font-body text-lg mb-6 leading-snug">
                                    Because you noted <strong>{criticalContent}</strong>, we recommend seeing a specialist soon to rule out anything serious.
                                </p>
                                <button 
                                    onClick={onBookAppointment}
                                    className="w-full bg-white text-burnt-orange font-display text-xl uppercase py-3 border-2 border-ink shadow-[4px_4px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2"
                                >
                                    <span>Book Appointment Now</span>
                                    <span>→</span>
                                </button>
                            </div>
                        </div>

                        {/* Minor Card */}
                        <div className={`w-full transform transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${
                            showResult && resultStatus === 'minor'
                                ? 'translate-y-0 opacity-100 rotate-1 scale-100 relative' 
                                : 'absolute translate-y-4 opacity-0 pointer-events-none scale-95'
                        }`}>
                            <div className="bg-olive p-6 shadow-md border-2 border-ink relative rounded-sm text-white">
                                <h3 className="font-display text-2xl uppercase mb-2 border-b-2 border-white/20 pb-2">Good to Track</h3>
                                <p className="font-body text-lg mb-6 leading-snug">
                                    These symptoms are likely minor, but good to track. Ask your doctor about them at your next visit.
                                </p>
                                <a 
                                    href={`mailto:?subject=My Symptom Checklist&body=${emailBody}`}
                                    className="block text-center w-full bg-white text-olive font-display text-xl uppercase py-3 border-2 border-ink shadow-[4px_4px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
                                >
                                    Email Me This List
                                </a>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Checklist;
