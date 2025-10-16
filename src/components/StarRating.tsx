import { useState } from 'react';
import { Button } from './ui/button';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  onChange: (rating: number) => void;
}

export function StarRating({ onChange }: StarRatingProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          variant="ghost"
          className="p-1 h-auto"
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(rating)}
          onClick={() => {
            setRating(star);
            onChange(star);
          }}
        >
          <FaStar
            className={`text-2xl ${
              star <= (hover || rating)
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </Button>
      ))}
    </div>
  );
}