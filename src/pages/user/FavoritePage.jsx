import React from 'react';
import { riverSunsetCity } from '../../assets';

const favorites = [
  {
    id: 1,
    name: "Luna's home",
    location: 'Dĩ an, Bình Dương',
    image: riverSunsetCity,
  },
];

const FavoritePage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="font-bold text-3xl mb-4">Yêu thích</h2>
      {favorites.map(item => (
        <div key={item.id} className="flex items-center bg-white px-4 py-4 mb-4">
          <div className="w-24 h-24 rounded-lg mr-5 flex-shrink-0 overflow-hidden bg-gray-300 flex items-center justify-center">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <img src="https://via.placeholder.com/96x96?text=Room" alt="placeholder" className="w-full h-full object-cover" />
            )}
          </div>
          <div>
            <div className="font-bold text-lg mb-1">{item.name}</div>
            <div className="flex items-center text-gray-700">
              <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="location" className="w-5 h-5 mr-1" />
              <span>{item.location}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritePage;