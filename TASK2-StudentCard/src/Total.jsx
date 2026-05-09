const Total = ({ courses }) => {
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0)

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '12px',
      paddingTop: '10px',
      borderTop: '1px solid rgba(233,69,96,0.4)',
      fontWeight: '700',
      fontSize: '14px',
    }}>
      <span style={{ color: '#eaeaea' }}>Total Credits</span>
      <span style={{
        background: '#e94560',
        color: '#fff',
        borderRadius: '8px',
        padding: '3px 10px',
        fontSize: '13px',
      }}>
        {totalCredits} cr
      </span>
    </div>
  )
}

export default Total
