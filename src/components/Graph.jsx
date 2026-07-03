import { useEffect, useRef } from 'react';
import functionPlot from 'function-plot';

export default function Graph({ functions, width = 500, height = 300 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        functionPlot({
          target: containerRef.current,
          width,
          height,
          grid: true,
          data: functions.map(fn => ({ fn }))
        });
      } catch (e) {
        console.error("Function plot error", e);
      }
    }
  }, [functions, width, height]);

  return <div ref={containerRef} style={{ backgroundColor: 'white', borderRadius: '0.5rem', padding: '1rem', width: 'fit-content', margin: '1rem auto' }} />;
}
