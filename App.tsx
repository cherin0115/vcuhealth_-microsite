
import React, { useState } from 'react';
import Hero from './components/Hero';
import Checklist from './components/Checklist';
import InfoSection from './components/InfoSection';
import ScriptGenerator from './components/ScriptGenerator';
import AppointmentModal from './components/AppointmentModal';
import { Symptom } from './types';

const App: React.FC = () => {
    const [symptoms, setSymptoms] = useState<Symptom[]>([
        { id: 'itching', label: 'Persistent Itching', checked: false, category: 'minor' },
        { id: 'bowel', label: 'Changes in Bowel Habits', checked: false, category: 'minor' },
        { id: 'bleeding', label: 'Bleeding (Thought it was hemorrhoids?)', checked: false, category: 'critical' },
        { id: 'hpv', label: 'History of HPV', checked: false, category: 'minor' },
        { id: 'mucus', label: 'Unexplained discharge or mucus', checked: false, category: 'critical' },
        { id: 'pain', label: 'Feeling of fullness or pain in the area', checked: false, category: 'critical' },
        { id: 'Lumps ', label: 'Lumps or bumps (Not sure if it is a skin tag?)', checked: false, category: 'critical' },
    ]);
    
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

    const handleToggleSymptom = (id: string) => {
        setSymptoms(prev => prev.map(s => 
            s.id === id ? { ...s, checked: !s.checked } : s
        ));
    };

    const activeSymptoms = symptoms.filter(s => s.checked).map(s => s.label);

    return (
        <main className="min-h-screen bg-cream bg-paper-texture font-body text-ink selection:bg-dusty-pink selection:text-white">
            <div className="max-w-[480px] mx-auto min-h-screen bg-white/50 backdrop-blur-sm border-x-2 border-dashed border-gray-300 shadow-2xl p-6 sm:p-8">
                
                <Hero />
                
                <Checklist 
                    symptoms={symptoms} 
                    onToggle={handleToggleSymptom}
                    onBookAppointment={() => setIsAppointmentModalOpen(true)}
                />
                
                <InfoSection />

                <section className="mt-12">
                    <h2 className="text-3xl font-display uppercase text-ink mb-6 text-center">Take Action</h2>
                    
                    <a href="https://www.masseycancercenter.org/cancer-types-and-treatments/cancer-treatment-teams/colorectal-cancers/#meet-our-team" target="_blank" rel="noopener noreferrer" className="block w-full py-4 px-6 bg-burnt-orange text-white font-display text-2xl uppercase tracking-wide border-2 border-ink shadow-retro hover:shadow-retro-active hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] transition-all rounded-full text-center mb-4">
                        Find a Specialist
                    </a>

                    <button 
                        onClick={() => setIsAppointmentModalOpen(true)}
                        className="block w-full py-4 px-6 bg-dusty-pink text-white font-display text-2xl uppercase tracking-wide border-2 border-ink shadow-retro hover:shadow-retro-active hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] transition-all rounded-full text-center mb-4"
                    >
                        Book Appointment
                    </button>
                    
                    <ScriptGenerator selectedSymptoms={activeSymptoms} />
                    
                    <a href="https://www.masseycancercenter.org/cancer-types-and-treatments/cancer-types/anal-cancer/" target="_blank" rel="noopener noreferrer" className="block w-full py-4 px-6 bg-white text-ink font-display text-2xl uppercase tracking-wide border-2 border-ink shadow-retro hover:shadow-retro-active hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] transition-all rounded-full text-center">
                        Massey Cancer Center Info
                    </a>
                </section>

                <footer className="mt-16 pt-10 border-t-2 border-dashed border-ink/30 text-center">
                    <div className="flex justify-center gap-4 text-sm font-bold opacity-60 tracking-widest mb-4 font-display">
                        <span>RVA MOMS</span>
                        <span className="text-burnt-orange">•</span>
                        <span>MASSEY CANCER CENTER</span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">
                        Together for RVA Women's Health.<br/>
                        This is a safe, private space.
                    </p>
                </footer>

                <AppointmentModal 
                    isOpen={isAppointmentModalOpen}
                    onClose={() => setIsAppointmentModalOpen(false)}
                    selectedSymptoms={activeSymptoms}
                />

            </div>
        </main>
    );
};

export default App;
