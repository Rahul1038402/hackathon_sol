import { Star } from 'lucide-react';

interface Criterion {
  name: string;
  rating?: number;
}

interface RatingSystemProps {
  title: string;
  criteria: Criterion[];
  onRate: (index: number, rating: number) => void;
}

const RatingSystem: React.FC<RatingSystemProps> = ({ title, criteria, onRate }) => (
  <div className="bg-white rounded-lg shadow p-4 m-4"><h3 className="font-semibold text-lg mb-4">{title}</h3>{criteria.map((criterion, index) => (<div key={index} className="mb-4"><div className="flex justify-between items-center mb-2"><span className="text-sm font-medium text-gray-800">{criterion.name}</span><div className="flex space-x-1">{[1, 2, 3, 4, 5].map(star => (<Star key={star} className={`w-6 h-6 cursor-pointer transition-colors ${star <= (criterion.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`} onClick={() => onRate(index, star)} />))}</div></div></div>))}<textarea placeholder="Share your experience (optional)..." className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500" rows={3} /><button className="w-full bg-green-600 text-white py-2.5 rounded-lg mt-3 font-semibold hover:bg-green-700 transition-colors">Submit Rating</button></div>
);

export { RatingSystem };