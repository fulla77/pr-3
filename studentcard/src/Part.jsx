const Part = ({ courseName, credits }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '6px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      fontSize: '14px',
    }}>
      <span style={{ color: '#ccc' }}>{courseName}</span>
      <span style={{
        background: 'rgba(233,69,96,0.15)',
        color: '#e94560',
        borderRadius: '6px',
        padding: '2px 8px',
        fontSize: '12px',
        fontWeight: '600',
      }}>
        {credits} cr
      </span>
    </div>
  )
}

export default Part
