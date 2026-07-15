import React from 'react';

export default function ServiceCard({ service }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition duration-200">
      <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{service.description}</p>
    </div>
  );
}