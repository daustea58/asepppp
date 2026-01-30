import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { ThumbsUp, ThumbsDown, BarChart3 } from 'lucide-react';
import axios from 'axios';

const VotingSystem = ({ playSound }) => {
  const [votes, setVotes] = useState({ valid_votes: 0, invalid_votes: 0, total_votes: 0 });
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchVotes();
    // Check if user has already voted
    const voted = localStorage.getItem('hasVotedDPO');
    if (voted) {
      setHasVoted(true);
    }
  }, []);

  const fetchVotes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/votes`);
      setVotes(response.data);
    } catch (error) {
      console.error('Error fetching votes:', error);
    }
  };

  const handleVote = async (voteType) => {
    if (hasVoted || isLoading) return;
    
    setIsLoading(true);
    playSound('vote');
    
    try {
      const response = await axios.post(`${backendUrl}/api/vote?vote_type=${voteType}`);
      setVotes(response.data);
      setHasVoted(true);
      localStorage.setItem('hasVotedDPO', 'true');
      playSound('success');
    } catch (error) {
      console.error('Error submitting vote:', error);
      playSound('error');
    } finally {
      setIsLoading(false);
    }
  };

  const validPercentage = votes.total_votes > 0 
    ? Math.round((votes.valid_votes / votes.total_votes) * 100) 
    : 0;
  const invalidPercentage = votes.total_votes > 0 
    ? Math.round((votes.invalid_votes / votes.total_votes) * 100) 
    : 0;

  return (
    <div className="mb-12">
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-red-600 shadow-2xl overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-red-500" size={32} />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Voting: Apakah Info Ini Valid?
            </h2>
          </div>

          {/* Voting Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => handleVote('valid')}
              disabled={hasVoted || isLoading}
              className={`
                flex flex-col items-center justify-center gap-3 p-6 rounded-xl
                transition-all duration-300 transform hover:scale-105
                ${hasVoted 
                  ? 'bg-gray-700 cursor-not-allowed opacity-50' 
                  : 'bg-green-600 hover:bg-green-500 active:scale-95 cursor-pointer shadow-lg hover:shadow-green-500/50'
                }
              `}
              data-testid="vote-valid-button"
            >
              <ThumbsUp size={40} className="text-white" />
              <span className="text-white font-bold text-lg">VALID</span>
              <span className="text-white text-2xl font-black">{votes.valid_votes}</span>
            </button>

            <button
              onClick={() => handleVote('invalid')}
              disabled={hasVoted || isLoading}
              className={`
                flex flex-col items-center justify-center gap-3 p-6 rounded-xl
                transition-all duration-300 transform hover:scale-105
                ${hasVoted 
                  ? 'bg-gray-700 cursor-not-allowed opacity-50' 
                  : 'bg-red-600 hover:bg-red-500 active:scale-95 cursor-pointer shadow-lg hover:shadow-red-500/50'
                }
              `}
              data-testid="vote-invalid-button"
            >
              <ThumbsDown size={40} className="text-white" />
              <span className="text-white font-bold text-lg">TIDAK VALID</span>
              <span className="text-white text-2xl font-black">{votes.invalid_votes}</span>
            </button>
          </div>

          {/* Vote Status */}
          {hasVoted && (
            <div className="text-center mb-4">
              <p className="text-yellow-400 font-semibold animate-pulse">
                ✅ Terima kasih sudah voting!
              </p>
            </div>
          )}

          {/* Progress Bars */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-green-400 font-semibold">Valid</span>
                <span className="text-white font-bold">{validPercentage}%</span>
              </div>
              <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-500 rounded-full"
                  style={{ width: `${validPercentage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-red-400 font-semibold">Tidak Valid</span>
                <span className="text-white font-bold">{invalidPercentage}%</span>
              </div>
              <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500 rounded-full"
                  style={{ width: `${invalidPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Total Votes */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Total Suara: <span className="text-white font-bold text-lg">{votes.total_votes}</span>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VotingSystem;
