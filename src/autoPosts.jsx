import React from 'react';

export const AutoPostContent = ({ markdown }) => (
  <div className="space-y-5">
    {markdown.split(/\n{2,}/).map((block, index) => {
      const text = block.trim();
      if (!text) return null;
      if (text.startsWith('## ')) return <h2 key={index} className="text-2xl font-bold text-white mt-10 mb-4">{text.slice(3)}</h2>;
      if (text.startsWith('> ')) return <blockquote key={index} className="border-l-4 border-[#4F8CFF] pl-5 text-[#CBD5E1] italic">{text.slice(2)}</blockquote>;
      return <p key={index}>{text}</p>;
    })}
  </div>
);

export const autoPosts = [];
