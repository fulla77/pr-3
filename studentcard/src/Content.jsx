import Part from './Part'
import Total from './Total'

const Content = ({ gpa, courses }) => {
  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '14px',
      }}>
        <span style={{ fontSize: '13px', color: '#aaa' }}>GPA</span>
        <span style={{
          fontSize: '18px',
          fontWeight: '700',
          color: gpa >= 3.5 ? '#4ade80' : gpa >= 2.5 ? '#facc15' : '#e94560',
        }}>
          {gpa.toFixed(2)}
        </span>
      </div>

      <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Courses
      </p>

      {courses.map((course, index) => (
        <Part key={index} courseName={course.name} credits={course.credits} />
      ))}

      <Total courses={courses} />
    </div>
  )
}

export default Content
