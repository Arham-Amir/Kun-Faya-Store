import { ImWhatsapp } from 'react-icons/im';

const Whatsapp = () => {
    return (
        <div className="fixed bottom-8 right-5 rounded-full z-30 animate-bounce">
            <a href={'https://wa.me/+923160433221'} target='_blank'><ImWhatsapp className='text-green-500' size={40} /></a>
        </div>
    )
}

export default Whatsapp
