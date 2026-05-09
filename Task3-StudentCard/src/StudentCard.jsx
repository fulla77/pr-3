import Header from './Header'
import Content from './Content'

const StudentCard = ({ name, year, major, gpa, courses }) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      border: '1px solid #e94560',
      borderRadius: '16px',
      padding: '24px',
      width: '320px',
      boxShadow: '0 8px 32px rgba(233,69,96,0.2)',
      fontFamily: "'Segoe UI', sans-serif",
      color: '#eaeaea',
    }}>
      <Header name={name} year={year} major={major} />
      <Content gpa={gpa} courses={courses} />
    </div>
  )
}

export default StudentCard
