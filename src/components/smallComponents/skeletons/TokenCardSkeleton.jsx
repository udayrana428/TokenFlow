const TokenCardSkeleton = () => {
  return (
    <div className="flex space-x-3 items-center p-2 rounded-md bg-gray-800 animate-pulse">
      <div className="relative">
        {/* Skeleton for primary image */}
        <div className="w-9 h-9 bg-gray-500 rounded-full"></div>
        {/* Skeleton for secondary image */}
        <div className="w-5 h-5 bg-gray-500 rounded-full border-2 border-gray-800 absolute bottom-[-3px] left-[-3px]"></div>
      </div>
      <div>
        {/* Skeleton for token name */}
        <div className="w-24 h-4 bg-gray-500 rounded mb-2"></div>
        {/* Skeleton for network name */}
        <div className="w-32 h-3 bg-gray-500 rounded"></div>
      </div>
    </div>
  );
};

export default TokenCardSkeleton;
