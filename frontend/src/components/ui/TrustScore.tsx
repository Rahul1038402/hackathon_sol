import React from 'react';
import { CheckCircle } from 'lucide-react';
import type { TrustScoreProps } from '../../types';

export const TrustScore: React.FC<TrustScoreProps> = ({ score, badges }) => (
  <div className="bg-white rounded-lg shadow-sm p-4"><h3 className="font-semibold mb-3">Trust Score</h3><div className="text-center mb-4"><div className="text-4xl font-bold text-green-600">{score}</div><div className="text-sm text-gray-600">out of 100</div></div><div className="space-y-2">{badges.map((badge, index) => (<div key={index} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md"><CheckCircle className="w-5 h-5 text-green-600" /><span className="text-sm">{badge}</span></div>))}</div></div>
);