const button = ({color, text, onClick}) => {
  return (
    <div>
        <button onClick={onClick} className='btn'style={{backgroundColor: color}}>{text}</button>
    </div>
  )
}

export default button