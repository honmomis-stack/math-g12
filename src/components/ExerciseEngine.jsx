import { useReducer, useState } from 'react';
import MathInput from './MathInput';

const initialState = {
  currentQuestionIndex: 0,
  score: 0,
  hintLevel: 0,
  isCorrect: null,
  showResult: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SUBMIT_ANSWER':
      return {
        ...state,
        isCorrect: action.payload,
        score: action.payload ? state.score + 1 : state.score,
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        isCorrect: null,
        hintLevel: 0,
      };
    case 'SHOW_HINT':
      return {
        ...state,
        hintLevel: Math.min(state.hintLevel + 1, action.payload),
      };
    case 'RESET_QUIZ':
      return initialState;
    case 'FINISH_QUIZ':
      return {
        ...state,
        showResult: true,
      };
    default:
      return state;
  }
}

export default function ExerciseEngine({ questions }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [mathInput, setMathInput] = useState('');
  
  if (!questions || questions.length === 0) return null;
  
  if (state.showResult) {
    return (
      <div className="glass fade-in" style={{ padding: '2rem', borderRadius: '1rem', textAlign: 'center' }}>
        <h3 className="heading" style={{ fontSize: '1.5rem', color: 'var(--success)' }}>អបអរសាទរ!</h3>
        <p>អ្នកទទួលបានពិន្ទុ {state.score} / {questions.length}</p>
        <button className="btn btn-primary" onClick={() => dispatch({ type: 'RESET_QUIZ' })}>ធ្វើម្តងទៀត</button>
      </div>
    );
  }
  
  const question = questions[state.currentQuestionIndex];
  const maxHints = question.hints ? question.hints.length : 0;
  
  const handleSubmitMCQ = (choice) => {
    dispatch({ type: 'SUBMIT_ANSWER', payload: choice.is_correct });
  };
  
  const handleSubmitMath = () => {
    // For mock, simple string match (e.g. "5")
    const isCorrect = mathInput.trim() === question.correctAnswer;
    dispatch({ type: 'SUBMIT_ANSWER', payload: isCorrect });
  };
  
  const handleNext = () => {
    setMathInput('');
    if (state.currentQuestionIndex < questions.length - 1) {
      dispatch({ type: 'NEXT_QUESTION' });
    } else {
      dispatch({ type: 'FINISH_QUIZ' });
    }
  };

  const renderMathInline = (text) => {
    // A simple mock for katex inline
    return text.replace(/\$([^$]+)\$/g, '<i>$1</i>');
  }

  return (
    <div className="glass fade-in" style={{ padding: '2rem', borderRadius: '1rem', marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>សំណួរទី {state.currentQuestionIndex + 1} / {questions.length}</span>
        <span>ពិន្ទុ: {state.score}</span>
      </div>
      
      <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }} dangerouslySetInnerHTML={{ __html: renderMathInline(question.text) }} />
      
      {question.type === 'mcq' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {question.choices.map((choice) => (
            <button 
              key={choice.id} 
              className="btn btn-outline"
              onClick={() => state.isCorrect === null && handleSubmitMCQ(choice)}
              style={{
                justifyContent: 'flex-start',
                backgroundColor: state.isCorrect !== null && choice.is_correct ? 'rgba(34, 197, 94, 0.2)' : 
                               state.isCorrect === false && !choice.is_correct ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                borderColor: state.isCorrect !== null && choice.is_correct ? 'var(--success)' : 'var(--border)',
                pointerEvents: state.isCorrect !== null ? 'none' : 'auto',
                textAlign: 'left'
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: renderMathInline(choice.text) }} />
            </button>
          ))}
        </div>
      )}
      
      {question.type === 'math' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <MathInput value={mathInput} onChange={setMathInput} />
          <button 
            className="btn btn-primary" 
            onClick={handleSubmitMath}
            disabled={state.isCorrect !== null || mathInput.length === 0}
          >
            បញ្ជូនចម្លើយ
          </button>
        </div>
      )}
      
      {state.isCorrect !== null && (
        <div className="fade-in" style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: '0.5rem', backgroundColor: state.isCorrect ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `1px solid ${state.isCorrect ? 'var(--success)' : 'var(--error)'}` }}>
          <p style={{ color: state.isCorrect ? 'var(--success)' : 'var(--error)', margin: 0, fontWeight: 'bold' }}>
            {state.isCorrect ? 'ចម្លើយត្រឹមត្រូវ!' : 'ចម្លើយមិនត្រឹមត្រូវទេ'}
          </p>
          <button className="btn btn-primary" onClick={handleNext} style={{ marginTop: '1rem' }}>
            {state.currentQuestionIndex < questions.length - 1 ? 'សំណួរបន្ទាប់' : 'បញ្ចប់'}
          </button>
        </div>
      )}
      
      {/* Progressive-Hint Prompting System (PHP) */}
      {state.isCorrect === null && maxHints > 0 && (
        <div style={{ marginTop: '2rem' }}>
          {state.hintLevel > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              {question.hints.slice(0, state.hintLevel).map((hint, idx) => (
                <div key={idx} className="fade-in" style={{ padding: '0.75rem', backgroundColor: 'rgba(14, 165, 233, 0.1)', borderLeft: '4px solid var(--secondary)', borderRadius: '0 0.5rem 0.5rem 0' }}>
                  <span style={{ fontSize: '0.9rem' }}>💡 ជំនួយទី {idx + 1}: {hint}</span>
                </div>
              ))}
            </div>
          )}
          {state.hintLevel < maxHints && (
            <button 
              className="btn btn-outline" 
              onClick={() => dispatch({ type: 'SHOW_HINT', payload: maxHints })}
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            >
              សុំជំនួយ ({state.hintLevel}/{maxHints})
            </button>
          )}
        </div>
      )}
    </div>
  );
}
