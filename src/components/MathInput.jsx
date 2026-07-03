import { useEffect, useRef } from 'react';
import 'mathlive';

export default function MathInput({ value, onChange }) {
  const mfRef = useRef(null);

  useEffect(() => {
    const mf = mfRef.current;
    if (mf) {
      mf.value = value;
      mf.addEventListener('input', (ev) => {
        onChange(ev.target.value);
      });
    }
  }, [onChange]);

  // Sync value when changed from outside
  useEffect(() => {
    if (mfRef.current && mfRef.current.value !== value) {
        mfRef.current.value = value;
    }
  }, [value]);

  return (
    <div style={{ fontSize: '1.2rem', padding: '0.5rem', backgroundColor: 'var(--surface)', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
      <math-field ref={mfRef}></math-field>
    </div>
  );
}
