import React from 'react'
import PropTypes from 'prop-types';


export default function Layout({children}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white py-4 px-6">
        <h1 className="text-2xl font-semibold">My App</h1>
      </header>
      <main className="flex-1 px-20">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-4 px-6 text-center">
        <p>&copy; 2024 My App. All rights reserved.</p>
      </footer>
    </div>  )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };
  