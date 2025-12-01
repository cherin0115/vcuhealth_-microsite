import React from 'react';
import { InfoCardProps } from '../types';

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description }) => (
    <div className="flex items-start mb-6 pb-6 border-b border-gray-300 last:border-0 last:mb-0 last:pb-0">
        <div className="text-4xl mr-5 w-12 text-center pt-1" role="img" aria-label={title}>
            {icon}
        </div>
        <div>
            <h3 className="text-2xl font-display uppercase text-ink mb-1">{title}</h3>
            <p className="text-base text-gray-800 font-body leading-snug">{description}</p>
        </div>
    </div>
);

const InfoSection: React.FC = () => {
    return (
        <section className="mb-12">
            <h2 className="text-3xl font-display uppercase text-ink border-b-4 border-olive inline-block mb-6">
                Connect the Dots
            </h2>
            
            <div className="bg-cream p-2">
                <InfoCard 
                    icon="🔗"
                    title="The Link"
                    description="HPV affects both the cervix and the anal canal. They are 'neighbors' sharing similar risks and biology."
                />
                <InfoCard 
                    icon="🧬"
                    title="The 'Anal Pap'"
                    description="It's just a swab. Quick, gentle, and basically painless. Like a Pap smear, but for the back door."
                />
                <InfoCard 
                    icon="🍑"
                    title="Prevention"
                    description="Anal cancer is highly treatable when caught early. Knowing your status is your power."
                />
            </div>
        </section>
    );
};

export default InfoSection;