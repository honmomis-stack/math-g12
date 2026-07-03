import { useParams, Link } from 'react-router-dom';
import { subchapters } from '../data/mockData';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import Graph from '../components/Graph';
import ExerciseEngine from '../components/ExerciseEngine';
import { ArrowLeft } from 'lucide-react';

export default function Lesson() {
  const { id } = useParams();
  const lesson = subchapters.find(sub => sub.id === parseInt(id));

  if (!lesson) {
    return <div className="container">រកមិនឃើញមេរៀននេះទេ</div>;
  }

  return (
    <div className="container fade-in">
      <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
        <ArrowLeft size={18} /> ត្រឡប់ទៅមាតិកាវិញ
      </Link>
      
      <div className="glass" style={{ padding: '2rem 3rem', borderRadius: '1rem', marginBottom: '2rem' }}>
        <h1 className="heading" style={{ fontSize: '2.2rem', color: 'var(--primary)', marginBottom: '1.5rem', marginTop: 0 }}>{lesson.title}</h1>
        
        <div className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {lesson.content}
          </ReactMarkdown>
        </div>
        
        {lesson.graph && (
          <div style={{ margin: '3rem 0' }}>
            <h3 className="heading" style={{ marginBottom: '1rem' }}>ក្រាបអន្តរកម្ម</h3>
            <Graph functions={lesson.graph.functions} />
          </div>
        )}
      </div>
      
      {lesson.questions && lesson.questions.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h2 className="heading" style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ display: 'inline-block', width: '6px', height: '1.8rem', backgroundColor: 'var(--primary)', borderRadius: '4px' }}></span>
            លំហាត់អនុវត្តន៍
          </h2>
          <ExerciseEngine questions={lesson.questions} />
        </div>
      )}
    </div>
  );
}
