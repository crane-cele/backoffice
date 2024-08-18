import React, { useState, useEffect } from 'react';
import { Message } from '../redux/types';

interface MessageFormProps {
  onSubmit: (message: Message) => void;
  initialMessage?: Message;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSubmit, initialMessage }) => {
  const [text, setText] = useState(initialMessage?.text || '');
  const [segments, setSegments] = useState<string[]>(initialMessage?.segments || []);

  useEffect(() => {
    if (initialMessage) {
      setText(initialMessage.text);
      setSegments(initialMessage.segments);
    }
  }, [initialMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message: Message = {
      id: initialMessage?.id || Date.now().toString(),
      text,
      segments,
    };
    onSubmit(message);
    setText('');
    setSegments([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Message Text</label>
        <input
          type="text"
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {initialMessage ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default MessageForm;