const ShutDownPage = () => {
    return (
        <>
            <div className="p-6 lg:p-0 flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white relative overflow-hidden">
                {/* Frosted Glass Effect */}
                <div className="absolute inset-0 bg-gray-600 bg-opacity-20 backdrop-blur-md"></div>

                <div className="z-10 text-center p-8 border border-cyan-500/50 rounded-lg shadow-2xl bg-gray-800/60">
                    {/* Title */}
                    <h1 className="text-5xl font-bold mb-4 text-cyan-400 tracking-wide uppercase">
                        The Quiet End
                    </h1>

                    {/* Subtext */}
                    <p className="text-lg text-gray-300 mb-2">
                        We are closed. This chapter is frozen, locked away, and won't reopen.
                    </p>
                    <p className="text-sm text-gray-400">
                        Thank you for understanding. It’s time to move forward.
                    </p>
                </div>

                <div class="frosted absolute inset-0"></div>

                <div class="ice-crystal"></div>
                <div class="ice-crystal"></div>

                {/* Icy Details */}
                <div className="absolute top-0 left-0 w-48 h-48 bg-cyan-500/10 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-700/20 blur-3xl rounded-full"></div>


            </div>
        </>


    );
};

export default ShutDownPage;
