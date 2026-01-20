import React from 'react'

function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-blue-600">TripMate</h3>
          <p className="text-sm text-gray-500 mt-1">
            AI-powered travel planning made simple
          </p>
        </div>

        {/* Center Links */}
        <div className="flex gap-4 text-sm text-gray-600">
          <span className="hover:text-blue-500 cursor-pointer">
            Privacy Policy
          </span>
          <span className="hover:text-blue-500 cursor-pointer">
            Terms of Service
          </span>
          <span className="hover:text-blue-500 cursor-pointer">
            Contact
          </span>
        </div>

        {/* Right */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} TripMate
        </p>
      </div>
    </footer>
  )
}

export default Footer
