"use client";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-violet-800 text-white py-6">
            <div className="container mx-auto text-center space-y-4">


                {/* Copyright message */}
                <div className="text-sm">
                    <p>© {currentYear} My Romantic Blog. All rights reserved.</p>
                </div>


            </div>
        </footer>
    );
};

export default Footer;
