    'use client';
    import { useState } from 'react';
    import { encode, decode } from 'gpt-tokenizer';

    const TOKEN_COLORS = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-purple-100 text-purple-800',
    'bg-amber-100 text-amber-800',
    'bg-cyan-100 text-cyan-800',
    'bg-indigo-100 text-indigo-800',
    'bg-emerald-100 text-emerald-800',
    'bg-violet-100 text-violet-800',
    'bg-fuchsia-100 text-fuchsia-800',
    'bg-rose-100 text-rose-800',
    ];

    export default function Tokenizer() {
    const [text, setText] = useState('');
    const tokens = encode(text);

    const copyAllTokens = () => {
    if (tokens.length > 0) {
      navigator.clipboard.writeText(tokens.join(' '));
    }
  };
  
    return (
        <div className="font-sans p-6 bg-white rounded-lg shadow-sm h-screen">
        <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-800 mb-1">GPT Tokenizer</h1>
            <p className="text-sm text-gray-500">Visualize how GPT breaks down your text into tokens</p>
        </div>

        <textarea
            rows={5}
            placeholder="Type or paste text here to tokenize..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 text-sm border border-gray-200 rounded-lg mb-4 resize-none 
                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                    transition placeholder-gray-400 text-gray-700"
        />

        <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">
            Token count: <span className="font-semibold text-blue-600">{tokens.length}</span>
            </p>
            {tokens.length > 0 && (
            <div className="flex items-center gap-3">
            <p className="text-xs text-gray-500">
                Click on tokens to copy their IDs
            </p>
            <button
              onClick={copyAllTokens}
              className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition cursor-pointer"
            >
              Copy All Tokens
            </button>
            </div>
            )}
        </div>

        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[60px]">
            {tokens.map((t, i) => (
            <button
                key={i}
                onClick={() => navigator.clipboard.writeText(t.toString())}
                className={`${TOKEN_COLORS[i % TOKEN_COLORS.length]} px-2 py-1 rounded-md 
                        text-xs font-mono flex flex-col items-center min-w-[36px] 
                        hover:opacity-90 transition cursor-pointer border border-white border-opacity-30`}
                title="Click to copy token ID"
            >
                <span className="font-medium">{decode([t]) || '[space]'}</span>
                <span className="text-[10px] opacity-70 mt-0.5">{t}</span>
            </button>
            ))}
        </div>

        {tokens.length > 0 && (
            <p className="mt-3 text-xs text-gray-500 text-center">
            Tokens are colored based on their position in the sequence
            </p>
        )}
        </div>
    );
    }