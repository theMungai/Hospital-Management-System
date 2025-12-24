export default function metricsSkeleton(){
    return (
        <div className="my-8">
            <div className="w-full grid grid-cols-4 xs:grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-2">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="group relative overflow-hidden rounded-[6px] border border-gray-100 bg-white px-4 py-2 shadow-sm">
                        {/* Background glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Animated border glow */}
                        <div className="absolute inset-0 rounded-[6px] border border-transparent group-hover:border-gray-200 transition-all duration-300"></div>
                        
                        {/* Content skeleton with subtle animation */}
                        <div className="relative">
                            {/* Icon & title row */}
                            <div className="flex gap-x-3 mb-5">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-gray-200 to-gray-100 animate-pulse"></div>
                                <div className="space-y-2 flex-1">
                                    <div className="w-24 h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse"></div>
                                    <div className="w-16 h-3 bg-gradient-to-r from-gray-100 to-gray-50 rounded animate-pulse"></div>
                                </div>
                            </div>
                            
                            {/* Count number with more prominent animation */}
                            <div className="mb-10 space-y-3">
                                <div className="w-3/4 h-12 bg-gradient-to-r from-gray-300 to-gray-200 rounded animate-pulse"></div>
                                <div className="w-1/2 h-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse"></div>
                            </div>
                            
                            {/* Status badge & subtitle */}
                            <div className="flex items-center">
                                <div className="w-12 h-6 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full mr-2 animate-pulse"></div>
                                <div className="w-24 h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse"></div>
                            </div>
                        </div>
                        
                        {/* Subtle overlay shimmer on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}