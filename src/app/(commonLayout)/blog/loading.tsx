export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        {/* Outer spinning circle */}
        <div
          className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin"
          style={{
            borderImage: "linear-gradient(to right, #9333ea, #db2777) 1",
          }}
        />

        {/* Inner pulsing gradient circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
