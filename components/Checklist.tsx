import React from 'react';
import { Symptom } from '../types';

interface ChecklistProps {
    symptoms: Symptom[];
    onToggle: (id: string) => void;
}

const Checklist: React.FC<ChecklistProps> = ({ symptoms, onToggle }) => {
    const hasCheckedItems = symptoms.some(s => s.checked);

    return (
        <section className="mb-12 relative z-10">
            <h2 className="text-3xl font-display uppercase text-ink border-b-4 border-burnt-orange inline-block mb-6 transform -rotate-1">
                Private Check <span className="text-burnt-orange">*</span>
            </h2>
            
            <div className="relative group">
                {/* Paper Stack Effect */}
                <div className="absolute inset-0 bg-gray-200 rounded-sm transform rotate-2 translate-x-2 translate-y-2 border border-gray-300"></div>
                
                {/* Main Paper */}
                <div className="relative bg-[#FDFBF7] border border-gray-300 p-6 rounded-sm shadow-lg min-h-[320px]">
                    
                    {/* Notebook Margin Line */}
                    <div className="absolute top-0 bottom-0 left-8 w-px bg-red-300/50"></div>
                    <div className="absolute top-0 bottom-0 left-9 w-px bg-red-300/50"></div>

                    <div className="pl-8 relative z-10">
                        <p className="font-display text-ink/60 uppercase tracking-widest mb-6 text-sm">
                            Mark what feels familiar:
                        </p>
                        
                        <div className="space-y-4">
                            {symptoms.map((symptom) => (
                                <label key={symptom.id} className="flex items-center cursor-pointer group/item select-none relative py-1">
                                    {/* Invisible real checkbox */}
                                    <input 
                                        type="checkbox" 
                                        className="peer sr-only" 
                                        checked={symptom.checked}
                                        onChange={() => onToggle(symptom.id)}
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

                    {/* Result Note (Sticky Note Style) */}
                    <div className={`mt-8 mx-4 transform transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${
                        hasCheckedItems 
                            ? 'translate-y-0 opacity-100 rotate-1 scale-100' 
                            : 'translate-y-8 opacity-0 pointer-events-none scale-95'
                    }`}>
                        <div className="bg-yellow-100 p-4 shadow-md border border-yellow-200/50 relative">
                             {/* Tape effect */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/40 rotate-1"></div>
                            
                            <div className="flex flex-col items-center text-center">
                                <p className="font-display text-xl uppercase text-ink mb-1">Don't Panic.</p>
                                <p className="font-hand text-2xl text-ink/80 leading-none">
                                    It's likely minor, but asking brings peace of mind.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Checklist;