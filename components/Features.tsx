import { Truck, ShieldCheck, RefreshCw, Headset } from "lucide-react";

const Features = () => {
    const features = [
        {
            icon: <Truck className="w-10 h-10 text-primary" />,
            title: "Free Shipping",
            description: "On all orders over $100",
        },
        {
            icon: <ShieldCheck className="w-10 h-10 text-primary" />,
            title: "Secure Payment",
            description: "100% secure payment",
        },
        {
            icon: <RefreshCw className="w-10 h-10 text-primary" />,
            title: "30 Day Returns",
            description: "Easy returns & exchanges",
        },
        {
            icon: <Headset className="w-10 h-10 text-primary" />,
            title: "24/7 Support",
            description: "Dedicated support team",
        },
    ];

    return (
        <div className="py-16 bg-gray-50 dark:bg-background">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-6 bg-white dark:bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border dark:border-gray-800"
                        >
                            <div className="mb-4 p-3 bg-primary/10 rounded-full">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-2 dark:text-white">{feature.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
