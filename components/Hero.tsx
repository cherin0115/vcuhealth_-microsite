import React from 'react';
import bannerImg from '../img/Final5.png';

const Hero: React.FC = () => {
    return (
        <section className="text-center py-10 px-4">
            <div className="relative w-full max-w-[300px] mx-auto mb-6 group cursor-pointer">
                <div className="absolute inset-0 bg-ink translate-x-2 translate-y-2 rounded-lg transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                <div className="relative border-4 border-ink rounded-lg overflow-hidden bg-gray-200">
                     <img 
                        src= {bannerImg}
                        alt="Banner" 
                        className="w-full h-auto object-cover filter contrast-125 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-white mix-blend-multiply opacity-40"></div>
                </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-display uppercase leading-[0.85] text-ink mb-4 tracking-tighter">
            </h1>
            
            <p className="font-bold text-lg font-display tracking-wider uppercase mb-2">What We Miss "Below the Belt"</p>
            
            <p className="text-lg font-body max-w-md mx-auto leading-relaxed">
                You check your breasts. You check your cervix. <br />
               But is your <span className="text-burnt-orange font-bold font-hand text-3xl px-1">Peach</span> part of the picture?
            </p>
        </section>
    );
};

export default Hero;

//Hero will be changed.
