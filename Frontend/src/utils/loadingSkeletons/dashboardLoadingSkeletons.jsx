function DashboardShimmer() {
    return (
        <div className="bg-white rounded-[10px] overflow-hidden font-poppins">
            {/* Header shimmer */}
            <section className="flex justify-between items-center px-4 py-3 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="w-32 h-6 bg-gray-200 rounded"></div>
                </div>
                <div className="relative z-10">
                    <div className="w-16 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
            </section>
            
            {/* Table headers shimmer */}
            <div className="flex items-center bg-gray-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
                {['w-1/4 min-w-[150px]', 'w-2/5 min-w-[200px]', 'w-[15%]', 'w-1/5'].map((width, i) => (
                    <div key={i} className={`text-xs font-bold tracking-wider p-3 border-b border-gray-100 ${width} relative z-10`}>
                        <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>

            {/* Rows shimmer with staggered effect */}
            <div className="divide-y divide-gray-100">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={`relative overflow-hidden ${i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" style={{animationDelay: `${i * 0.1}s`}}></div>
                        
                        <div className="flex items-center p-3 text-sm relative z-10">
                            {/* Doctor column */}
                            <div className="w-1/4 min-w-[150px] pr-2 flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                                <div className="space-y-1">
                                    <div className="w-24 h-4 bg-gray-300 rounded"></div>
                                    <div className="w-16 h-3 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                            
                            {/* Reason column */}
                            <div className="w-2/5 min-w-[200px] pr-2">
                                <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                                <div className="w-1/2 h-3 bg-gray-100 rounded mt-1"></div>
                            </div>
                            
                            {/* Date column */}
                            <div className="w-[15%]">
                                <div className="w-20 h-4 bg-gray-300 rounded"></div>
                            </div>
                            
                            {/* Status column */}
                            <div className="w-1/5">
                                <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Add CSS for shimmer animation */}
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </div>
    );
}

export default DashboardShimmer