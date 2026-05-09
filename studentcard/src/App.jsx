import StudentCard from './StudentCard'

const students = [
  {
    name: 'FullaHamedo',
    year: 3,
    major: 'Information Engineering',
    gpa: 3.85,
    courses: [
      { name: 'Data Structures', credits: 4 },
      { name: 'Operating Systems', credits: 3 },
      { name: 'Database Systems', credits: 3 },
      { name: 'Computer Networks', credits: 3 },
    ],
  },
  {
    name: 'Ahmad Nasser',
    year: 2,
    major: 'Computer Science',
    gpa: 3.10,
    courses: [
      { name: 'Algorithms', credits: 4 },
      { name: 'Web Development', credits: 3 },
      { name: 'Linear Algebra', credits: 3 },
    ],
  },
  {
    name: 'Sara Khalil',
    year: 4,
    major: 'Software Engineering',
    gpa: 3.65,
    courses: [
      { name: 'Software Design', credits: 4 },
      { name: 'AI Fundamentals', credits: 3 },
      { name: 'Cloud Computing', credits: 3 },
      { name: 'Graduation Project', credits: 6 },
    ],
  },
]

const App = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0f',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
    }}>
      <h1 style={{
        color: '#e94560',
        fontFamily: "'Segoe UI', sans-serif",
        fontSize: '28px',
        marginBottom: '8px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
      }}>
        Student Cards
      </h1>
      <p style={{ color: '#555', marginBottom: '40px', fontSize: '14px' }}>
        Information Engineering Department
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '28px',
        justifyContent: 'center',
      }}>
        {students.map((student, index) => (
          <StudentCard key={index} {...student} />
        ))}
      </div>
    </div>
  )
}

export default App
