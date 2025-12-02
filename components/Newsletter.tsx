"use client"

import { Send } from "lucide-react";

const Newsletter = () => {
    return (
        <div className="w-full bg-black text-white py-20 px-4 md:px-10 mt-10">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex flex-col gap-4 max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Join Our Newsletter
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Sign up for deals, new products and promotions. No spam, we promise.
                    </p>
                </div>

                <div className="w-full max-w-md flex gap-2">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2">
                        Subscribe <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
