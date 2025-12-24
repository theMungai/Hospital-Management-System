export default function LoadingSkeleton() {
    const rows = Array.from({ length: 8 });
    
    return (
        <div className="px-8 py-9 font-poppins animate-pulse">
            <div className="flex items-center justify-between mb-8">
                <div className="h-7 w-32 bg-gray-200 rounded-lg"></div>
                <div className="h-9 w-28 bg-gray-200 rounded-lg"></div>
            </div>
            
            <div className="bg-white rounded-lg border-[0.1px] border-gray-100 overflow-hidden">
                {/* Table Header Skeleton */}
                <div className="flex items-center bg-gray-50/50 border-b border-gray-100 p-0">
                    {[
                        { width: 'flex-1 min-w-[180px]' },
                        { width: 'w-[15%]' },
                        { width: 'w-[10%]' },
                        { width: 'w-[10%]' },
                        { width: 'w-[8%]' },
                        { width: 'flex-1 min-w-[200px]' },
                        { width: 'w-[18%]' },
                        { width: 'w-[17%]' },
                        { width: 'w-[5%] pr-4' },
                        { width: 'w-[40px]' }
                    ].map((col, idx) => (
                        <div key={idx} className={`h-12 ${col.width} p-3`}>
                            <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
                        </div>
                    ))}
                </div>

                {/* Table Rows Skeleton */}
                <div className="divide-y divide-gray-100">
                    {rows.map((_, rowIndex) => (
                        <div 
                            key={rowIndex} 
                            className={`flex items-center p-3 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-customTealBlue/[0.04]'}`}
                        >
                            {/* Doctor Column */}
                            <div className="flex items-center flex-1 min-w-[180px] pr-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 shimmer"></div>
                                <div className="h-4 bg-gray-200 rounded-md w-32 shimmer"></div>
                            </div>

                            {/* Specialty Column */}
                            <div className="w-[15%]">
                                <div className="h-4 bg-gray-200 rounded-md w-20 shimmer"></div>
                            </div>

                            {/* License Column */}
                            <div className="w-[10%]">
                                <div className="h-4 bg-gray-200 rounded-md w-16 shimmer"></div>
                            </div>

                            {/* Date Column */}
                            <div className="w-[10%]">
                                <div className="h-4 bg-gray-200 rounded-md w-24 shimmer"></div>
                            </div>

                            {/* Gender Column */}
                            <div className="w-[8%]">
                                <div className="h-4 bg-gray-200 rounded-md w-12 shimmer"></div>
                            </div>

                            {/* Address Column */}
                            <div className="flex-1 min-w-[200px]">
                                <div className="h-4 bg-gray-200 rounded-md w-40 shimmer"></div>
                            </div>

                            {/* Email Column */}
                            <div className="w-[18%]">
                                <div className="h-4 bg-gray-200 rounded-md w-36 shimmer"></div>
                            </div>

                            {/* Phone Column */}
                            <div className="w-[17%]">
                                <div className="h-4 bg-gray-200 rounded-md w-28 shimmer"></div>
                            </div>

                            {/* Status Column */}
                            <div className="w-[5%] pr-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-gray-200 rounded-full shimmer"></div>
                                    <div className="h-3 bg-gray-200 rounded-md w-16 shimmer"></div>
                                </div>
                            </div>

                            {/* Actions Column */}
                            <div className="w-[40px]">
                                <div className="w-6 h-6 bg-gray-200 rounded-full shimmer"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}