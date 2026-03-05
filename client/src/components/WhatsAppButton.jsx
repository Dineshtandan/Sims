import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
    // Replace with actual number
    const phoneNumber = "1234567890";
    const message = "Hi, I'm interested in your makeup services!";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 flex items-center justify-center"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={28} />
        </a>
    );
};

export default WhatsAppButton;
