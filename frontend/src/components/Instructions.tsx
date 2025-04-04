import React from 'react';

const Instructions: React.FC = () => {
  return (
    <div className="mb-4">
      <div className="bg-[var(--card-bg)] rounded-lg p-5 shadow-md text-left">
        <div className="flex flex-row items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--title-color)]">Cracker Barrel Peg Game</h1>
          <img src="/favicon.png" alt="Cracker Barrel Peg Game Icon" className="w-14 h-14" />
        </div>
        <h2 className="text-[var(--title-color)] text-xl font-medium mb-4 border-b border-[var(--border-color)] pb-2">How to Play</h2>
        
        <div className="space-y-3 mb-5">
          <p className="flex items-start">
            <span className="bg-[var(--button-bg)] text-white rounded-full h-6 w-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">1</span>
            <span className="text-base">Start with 14 pegs in a triangle (top hole empty)</span>
          </p>
          <p className="flex items-start">
            <span className="bg-[var(--button-bg)] text-white rounded-full h-6 w-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">2</span>
            <span className="text-base">Click a peg to select it (turns red)</span>
          </p>
          <p className="flex items-start">
            <span className="bg-[var(--button-bg)] text-white rounded-full h-6 w-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">3</span>
            <span className="text-base">Click an empty spot to jump over another peg</span>
          </p>
          <p className="flex items-start">
            <span className="bg-[var(--button-bg)] text-white rounded-full h-6 w-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">4</span>
            <span className="text-base">The jumped-over peg is removed</span>
          </p>
          <p className="flex items-start">
            <span className="bg-[var(--button-bg)] text-white rounded-full h-6 w-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">5</span>
            <span className="text-base">Goal: Leave only one peg on the board</span>
          </p>
        </div>

        <div className="bg-[var(--bg-color)] rounded p-4 mb-5">
          <h3 className="font-medium text-[var(--title-color)] text-lg mb-2">Valid Jump Rules:</h3>
          <ul className="list-disc ml-6 text-base space-y-2">
            <li>Destination must be empty</li>
            <li>Jump over exactly one peg</li>
            <li>Jump in straight line (horizontal or diagonal)</li>
          </ul>
        </div>
        
        <div className="border-t border-[var(--border-color)] pt-4">
          <h3 className="font-medium text-[var(--title-color)] text-lg mb-2">Pro Tips:</h3>
          <div className="text-base space-y-2">
            <p>• Plan several moves ahead</p>
            <p>• Keep pegs in the center when possible</p>
            <p>• Avoid creating isolated pegs</p>
            <p>• Expert goal: Last peg in the top position</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions; 