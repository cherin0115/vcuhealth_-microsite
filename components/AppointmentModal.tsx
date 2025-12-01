
import React, { useState, useEffect } from 'react';

interface AppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedSymptoms: string[];
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, selectedSymptoms }) => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        phone: '',
        email: '',
        insurance: '',
        language: 'English',
        notes: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    // Update notes when selectedSymptoms change or when modal opens
    useEffect(() => {
        if (isOpen) {
            const symptomText = selectedSymptoms.length > 0 
                ? `I am experiencing the following: ${selectedSymptoms.join(', ')}`
                : '';
            setFormData(prev => ({ ...prev, notes: symptomText }));
            setIsSubmitted(false);
        }
    }, [isOpen, selectedSymptoms]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
        }, 800);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm transition-opacity duration-300">
            {/* Modal Container (Clipboard/Chart style) */}
            <div className="relative w-full max-w-lg bg-[#FDFBF7] border-2 border-gray-300 rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto transform transition-transform duration-300 scale-100">
                
                {/* Header Strip */}
                <div className="bg-ink text-cream p-4 flex justify-between items-center sticky top-0 z-10 border-b-4 border-burnt-orange">
                    <h2 className="font-display text-2xl uppercase tracking-wider">Patient Intake Form</h2>
                    <button 
                        onClick={onClose}
                        className="text-cream/70 hover:text-white text-3xl font-display leading-none"
                    >
                        &times;
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-6 md:p-8">
                    
                    {isSubmitted ? (
                        <div className="text-center py-10 animate-fade-in">
                            <div className="w-20 h-20 bg-olive rounded-full flex items-center justify-center mx-auto mb-6 text-white text-5xl border-4 border-ink shadow-retro">
                                ✓
                            </div>
                            <h3 className="text-3xl font-display uppercase text-ink mb-4">Request Sent</h3>
                            <p className="font-body text-lg text-gray-700 mb-8">
                                We have received your request. A scheduler will contact you at <span className="font-bold">{formData.phone}</span> within 24 hours.
                            </p>
                            <button 
                                onClick={onClose} 
                                className="px-8 py-3 bg-burnt-orange text-white font-display text-xl uppercase border-2 border-ink shadow-retro hover:shadow-retro-active hover:translate-x-[1px] hover:translate-y-[1px] rounded-full transition-all"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-1 mb-4">
                                Personal Information
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="block font-display text-ink uppercase text-sm">Full Name *</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b-2 border-gray-300 focus:border-burnt-orange outline-none py-2 font-hand text-xl transition-colors"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block font-display text-ink uppercase text-sm">Date of Birth *</label>
                                    <input 
                                        type="date" 
                                        name="dob"
                                        required
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b-2 border-gray-300 focus:border-burnt-orange outline-none py-2 font-hand text-xl transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="block font-display text-ink uppercase text-sm">Phone Number *</label>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b-2 border-gray-300 focus:border-burnt-orange outline-none py-2 font-hand text-xl transition-colors"
                                        placeholder="(555) 555-5555"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block font-display text-ink uppercase text-sm">Email Address *</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b-2 border-gray-300 focus:border-burnt-orange outline-none py-2 font-hand text-xl transition-colors"
                                        placeholder="jane@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="block font-display text-ink uppercase text-sm">Insurance Type</label>
                                    <select 
                                        name="insurance"
                                        value={formData.insurance}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b-2 border-gray-300 focus:border-burnt-orange outline-none py-2 font-hand text-xl transition-colors appearance-none"
                                    >
                                        <option value="">Select Insurance...</option>
                                        <option value="Private">Private (Aetna, BCBS, etc.)</option>
                                        <option value="Medicare">Medicare</option>
                                        <option value="Medicaid">Medicaid</option>
                                        <option value="Self-Pay">Self-Pay</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="block font-display text-ink uppercase text-sm">Preferred Language</label>
                                    <select 
                                        name="language"
                                        value={formData.language}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b-2 border-gray-300 focus:border-burnt-orange outline-none py-2 font-hand text-xl transition-colors appearance-none"
                                    >
                                        <option value="English">English</option>
                                        <option value="Spanish">Spanish</option>
                                        <option value="Vietnamese">Vietnamese</option>
                                        <option value="Arabic">Arabic</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1 pt-4">
                                <label className="block font-display text-ink uppercase text-sm mb-1">Reason for Visit / Symptoms</label>
                                <div className="relative">
                                    <textarea 
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full bg-yellow-50 border-2 border-gray-300 focus:border-burnt-orange outline-none p-4 font-hand text-xl rounded-sm resize-none"
                                        placeholder="Please describe your concerns..."
                                    ></textarea>
                                    {/* Notebook lines effect overlay */}
                                    <div className="absolute inset-0 pointer-events-none opacity-10" style={{
                                        backgroundImage: 'linear-gradient(transparent 95%, #999 95%)',
                                        backgroundSize: '100% 2rem',
                                        backgroundPosition: '0 0.5rem'
                                    }}></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">* This information is kept strictly confidential.</p>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full py-4 mt-6 bg-dusty-pink text-white font-display text-2xl uppercase tracking-wide border-2 border-ink shadow-retro hover:shadow-retro-active hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px] transition-all rounded-full"
                            >
                                Submit Request
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppointmentModal;
