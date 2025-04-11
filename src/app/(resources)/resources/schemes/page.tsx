'use client'; // ✅ Important for Next.js App Router

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function GovtSchema() {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetch('/schema/schemas.json')
      .then((res) => res.json())
      .then((data) => setSchemes(data))
      .catch((err) => console.error('Error fetching schemes:', err));
  }, []);

  return (
    <div className="w-10/12 mx-auto mb-20">
      <h2 className="text-3xl font-bold mb-12 mt-20 ">📜 Government Schemes for Farmers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white shadow-md border border-gray-200 rounded-lg p-4 hover:shadow-lg transition"
          >
           <Image
  src={scheme.image_url}
  alt={scheme.name_en}
  width={500}
  height={160}
  className="w-full h-40 object-cover rounded-md mb-3"
  unoptimized // Add this if you're using external URLs without domain whitelist
/>

            <h3 className="text-lg font-semibold text-green-700">{scheme.name_bn}</h3>
            <p className="text-gray-600 italic text-sm">{scheme.name_en}</p>
            <p className="mt-1 text-sm"><strong>Type:</strong> {scheme.type}</p>
            <ul className="list-disc list-inside text-sm my-2 text-gray-700">
              {scheme.benefits.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
            <Link href={`/resources/schemes/${scheme.id}`}><button className='bg-green-700 text-white rounded-sm mt-6 font-semibold px-4 py-2'>Details</button></Link>
         
          </div>
        ))}
      </div>
    </div>
  );
}
