import { allExercisesMarkdown } from './exercisesData';

export const chapters = [
  {
    id: 1,
    title: "ជំពូកទី១៖ ចំនួនកុំផ្លិច",
    order: 1,
    subchapters: [
      { id: 101, title: "១. កម្រងលំហាត់ចំនួនកុំផ្លិច", order: 1 },
      { id: 102, title: "២. ទម្រង់ត្រីកោណមាត្រ", order: 2 }
    ]
  },
  {
    id: 2,
    title: "ជំពូកទី២៖ ធរណីមាត្រ",
    order: 2,
    subchapters: [
      { id: 201, title: "១. វ៉ិចទ័រក្នុងលំហ", order: 1 }
    ]
  }
];

export const subchapters = [
  {
    id: 101,
    chapter_id: 1,
    title: "១. កម្រងលំហាត់ចំនួនកុំផ្លិច",
    content: allExercisesMarkdown,
    questions: [
      {
        id: "q1",
        type: "mcq",
        text: "តើសមីការ $x^2 + 1 = 0$ មានឫសក្នុងសំណុំចំនួនពិត $\\mathbb{R}$ ឬទេ?",
        choices: [
          { id: "c1", text: "គ្មានទេ ព្រោះការេនៃចំនួនពិតមិនអាចអវិជ្ជមាន", is_correct: true },
          { id: "c2", text: "មាន គឺ $x = -1$", is_correct: false },
          { id: "c3", text: "មាន គឺ $x = 1$", is_correct: false }
        ],
        hints: [
          "ចំនួនពិតដែលលើកជាការេ តែងតែវិជ្ជមាន ឬស្មើសូន្យជានិច្ច។",
          "តើមានចំនួនពិតណាដែលគុណនឹងខ្លួនឯងស្មើ $-1$ ទេ?"
        ]
      },
      {
        id: "q2",
        type: "math",
        text: "គណនារបមាណវិធីនៃចំនួនកុំផ្លិច៖ $(-6 + 7i) + (12 - i)$",
        correctAnswer: "6+6i",
        hints: [
          "ផ្តុំផ្នែកពិត $(-6 + 12)$ ជាមួយគ្នា",
          "ផ្តុំផ្នែកនិម្មិត $(7i - i)$ ជាមួយគ្នា",
          "ចម្លើយមានទម្រង់ $a+bi$ តើ $a$ និង $b$ ស្មើប៉ុន្មាន?"
        ]
      }
    ]
  },
  {
    id: 102,
    chapter_id: 1,
    title: "២. ទម្រង់ត្រីកោណមាត្រ",
    content: `
ទម្រង់ត្រីកោណមាត្រនៃចំនួនកុំផ្លិច $z = a + bi$ កំណត់ដោយ៖
$z = r(\\cos \\theta + i \\sin \\theta)$ 
ដែល $r = \\sqrt{a^2 + b^2}$ ហៅថាម៉ូឌុល។
    `,
    graph: {
      type: "function-plot",
      functions: ["x"]
    },
    questions: []
  }
];
