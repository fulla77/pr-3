const Header = ({ name, year, major }) => {
  return (
    <div style={{
      borderBottom: '1px solid rgba(233,69,96,0.4)',
      paddingBottom: '16px',
      marginBottom: '16px',
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #e94560, #0f3460)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: '12px',
        color: '#fff',
      }}>
        {name.charAt(0)}
      </div>
      <h2 style={{ margin: '0 0 4px', fontSize: '20px', color: '#fff', letterSpacing: '0.5px' }}>
        {name}
      </h2>
      <p style={{ margin: '0 0 2px', fontSize: '13px', color: '#e94560', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
        {major}
      </p>
      <p style={{ margin: 0, fontSize: '13px', color: '#aaa' }}>
        Year {year}
      </p>
    </div>
  )
}

export default Header
