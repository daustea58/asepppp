import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import axios from 'axios';

const VisitorCounter = () => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const incrementVisitor = async () => {
      try {
        // Check if this is a new visit
        const lastVisit = localStorage.getItem('lastVisitDPO');
        const now = new Date().getTime();
        
        // Only count if it's been more than 1 hour since last visit
        if (!lastVisit || now - parseInt(lastVisit) > 3600000) {
          const response = await axios.post(`${backendUrl}/api/visitor-count`);
          setCount(response.data.count);
          localStorage.setItem('lastVisitDPO', now.toString());
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 1000);
        } else {
          // Just fetch the count without incrementing
          const response = await axios.get(`${backendUrl}/api/visitor-count`);
          setCount(response.data.count);
        }
      } catch (error) {
        console.error('Error updating visitor count:', error);
        // Fetch count even if increment fails
        try {
          const response = await axios.get(`${backendUrl}/api/visitor-count`);
          setCount(response.data.count);
        } catch (fetchError) {
          console.error('Error fetching visitor count:', fetchError);
        }
      }
    };

    incrementVisitor();
  }, [backendUrl]);

  // Format number with thousands separator
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 rounded-full shadow-lg border-2 border-red-400" data-testid="visitor-counter">
      <Eye className="text-white animate-pulse" size={24} />
      <div className="flex flex-col">
        <span className="text-white text-xs font-semibold uppercase tracking-wider">
          Pengunjung
        </span>
        <span className={`text-white text-2xl font-black tracking-tight ${isAnimating ? 'animate-bounce' : ''}`}>
          {formatNumber(count)}
        </span>
      </div>
    </div>
  );
};

export default VisitorCounter;
