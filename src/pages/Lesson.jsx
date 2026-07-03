import { useParams, Link } from 'react-router-dom';
import { subchapters } from '../data/mockData';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import Graph from '../components/Graph';
import ExerciseEngine from '../components/ExerciseEngine';
import { ArrowLeft, BookOpen, PenTool } from 'lucide-react';

export default function Lesson() {
  const { id } = useParams();
  const lesson = subchapters.find(sub => sub.id === parseInt(id));

  if (!lesson) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>រកមិនឃើញមេរៀននេះទេ</div>;
  }

  return (
    <div className="container fade-in" style={{ maxWidth: '900px' }}>
      <Link 
        to="/dashboard" 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          color: 'var(--text-muted)', 
          textDecoration: 'none', 
          marginBottom: '2rem', 
          fontWeight: '500',
          transition: 'color 0.2s' 
        }} 
        onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'} 
        onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        <ArrowLeft size={20} /> ត្រឡប់ទៅមាតិកាវិញ
      </Link>
      
      <div className="glass" style={{ padding: '3rem 4rem', borderRadius: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ padding: '0.75rem', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '0.75rem', color: 'var(--primary)' }}>
            <BookOpen size={28} />
          </div>
          <h1 className="heading" style={{ fontSize: '2.5rem', color: 'var(--text-main)', margin: 0 }}>{lesson.title}</h1>
        </div>
        
        <div className="markdown-content" style={{ color: 'var(--text-main)' }}>
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {lesson.content}
          </ReactMarkdown>
        </div>
        
        {lesson.graph && (
          <div style={{ margin: '3rem 0', padding: '2rem', background: 'var(--surface-hover)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
            <h3 className="heading" style={{ marginBottom: '1.5rem', marginTop: 0, textAlign: 'center' }}>ក្រាបអន្តរកម្ម</h3>
            <Graph functions={lesson.graph.functions} />
          </div>
        )}
      </div>
      
      {lesson.questions && lesson.questions.length > 0 && (
        <div style={{ marginTop: '4rem' }}>
          <h2 className="heading" style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ padding: '0.5rem', background: 'var(--primary)', borderRadius: '0.5rem', color: 'white', display: 'flex' }}>
               <PenTool size={24} />
            </div>
            លំហាត់អនុវត្តន៍
          </h2>
          <ExerciseEngine questions={lesson.questions} />
        </div>
      )}
    </div>
  );
}
