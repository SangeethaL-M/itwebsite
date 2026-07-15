import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-500 text-center py-8 text-xs">
      <p>&copy; {new Date().getFullYear()} Apex IT Solutions. All rights reserved.</p>
    </footer>
  );
}