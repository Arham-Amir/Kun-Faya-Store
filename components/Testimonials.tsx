"use client"
// components/Testimonials.tsx

import { useEffect } from 'react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HandCoins, Headset, PhoneCall, RotateCcw, Truck } from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';

SwiperCore.use([Autoplay, Pagination, Navigation]);

interface InfoCard {
    title: string;
    description: string;
    icon: React.ComponentType;
}

const infoCards: InfoCard[] = [
    {
        title: 'Delivery All Over Pakistan',
        description: 'No matter where you are in Pakistan, we ensure timely delivery of your products right to your doorstep.',
        icon: Truck, // Use the actual component
    },
    {
        title: 'Customer Service',
        description: 'Our dedicated customer service team is here to assist you with any queries or issues you may have.',
        icon: Headset, // Use the actual component
    },
    {
        title: 'Cash On Delivery',
        description: 'Enjoy the convenience of paying for your order with cash upon delivery, ensuring a hassle-free shopping experience.',
        icon: HandCoins, // Use the actual component
    },
    {
        title: 'Contact Us',
        description: 'We are always here to help. Feel free to reach out to us for any assistance you need.',
        icon: PhoneCall, // Use the actual component
    },
    {
        title: 'Broken Refund',
        description: 'If you receive a broken or defective product, we offer a hassle-free refund or replacement process.',
        icon: RotateCcw, // Use the actual component
    },
];

const Testimonials = () => {
    useEffect(() => {
        const swiper = new SwiperCore('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 32,
            loop: true,
            centeredSlides: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 32,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                },
            },
        });

        return () => swiper.destroy();
    }, []);

    return (
        <section className="py-14 px-5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl font-bold">What our customers get!</h2>
                </div>
                <Swiper
                    className="swiper-container"
                    slidesPerView={1}
                    spaceBetween={32}
                    loop={true}
                    centeredSlides={true}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 32 },
                        1024: { slidesPerView: 3, spaceBetween: 32 },
                    }}
                >
                    {infoCards.map((card, index) => (
                        <SwiperSlide key={index} className="mb-10 group bg-card border border-solid rounded-xl p-6 transition-all duration-500 hover:border-primary !flex flex-col !justify-center items-center gap-3">
                            <p className='text-center'><card.icon /></p>
                            <div className=" border-muted-foreground border-b px-3 text-center">
                                <h5 className="font-semibold mb-1">{card.title}</h5>
                            </div>
                            <div className='text-center'>
                                <p className="text-base">
                                    {card.description}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;
