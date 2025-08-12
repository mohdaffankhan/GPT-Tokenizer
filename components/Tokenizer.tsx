"use client";
import { useState } from "react";
import { encode, decode } from "gpt-tokenizer";

const TOKEN_COLORS = [
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-purple-100 text-purple-800",
  "bg-amber-100 text-amber-800",
  "bg-cyan-100 text-cyan-800",
  "bg-indigo-100 text-indigo-800",
  "bg-emerald-100 text-emerald-800",
  "bg-violet-100 text-violet-800",
  "bg-fuchsia-100 text-fuchsia-800",
  "bg-rose-100 text-rose-800",
];

export default function Tokenizer() {
  const [text, setText] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const tokens = encode(text);

  const copyAllTokens = () => {
    navigator.clipboard.writeText(tokens.join(" "));
  };

  const parsedTokens = tokenInput
    .split(/[\s,]+/)
    .map((t) => parseInt(t, 10))
    .filter((n) => !isNaN(n));

  return (
    <div className="font-sans p-6 bg-white rounded-lg shadow-sm min-h-screen">
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-bold text-gray-800">GPT Tokenizer</h1>
        <p className="text-sm text-gray-500">
          Visualize how GPT breaks down your text into tokens
        </p>
      </div>

      {/* TEXT → TOKENS */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-1">
          Text ➡ Tokens
        </h2>
        <p className="text-xs text-gray-500 mb-3">
          Type or paste text below to see its GPT token representation.
        </p>

        <textarea
          rows={5}
          placeholder="Type or paste text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 text-sm border border-gray-200 rounded-lg mb-4 resize-none 
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                  transition placeholder-gray-400 text-gray-700"
        />

        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-gray-600">
            Token count:{" "}
            <span className="font-semibold text-blue-600">{tokens.length}</span>
          </p>
          {tokens.length > 0 && (
            <button
              onClick={copyAllTokens}
              className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
            >
              Copy All Tokens
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[60px]">
          {tokens.map((t, i) => (
            <button
              key={i}
              onClick={() => navigator.clipboard.writeText(t.toString())}
              className={`${
                TOKEN_COLORS[i % TOKEN_COLORS.length]
              } px-2 py-1 rounded-md 
                      text-xs font-mono flex flex-col items-center min-w-[36px] 
                      hover:opacity-90 transition cursor-pointer border border-white border-opacity-30`}
              title="Click to copy token ID"
            >
              <span className="font-medium">{decode([t]) || "[space]"}</span>
              <span className="text-[10px] opacity-70 mt-0.5">{t}</span>
            </button>
          ))}
        </div>
        {tokens.length > 0 && (
          <p className="mt-3 text-xs text-gray-500 text-center">
            Click on tokens to copy their IDs ~ Tokens are colored based on
            their position in the sequence
          </p>
        )}
      </section>

      {/* TOKENS → TEXT */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-1">
          Tokens ➡ Text
        </h2>
        <p className="text-xs text-gray-500 mb-3">
          Enter token IDs (separated by spaces or commas) to see the decoded
          text.
        </p>

        <textarea
          rows={3}
          placeholder="e.g., 464, 3290, 318"
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
          className="w-full p-3 text-sm border border-gray-200 rounded-lg mb-4 resize-none 
                  focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 
                  transition placeholder-gray-400 text-gray-700"
        />

        {parsedTokens.length > 0 && (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs font-semibold text-green-700 mb-1">
              Decoded Text:
            </p>
            <p className="text-sm text-gray-800">{decode(parsedTokens)}</p>
          </div>
        )}
      </section>
    </div>
  );
}
