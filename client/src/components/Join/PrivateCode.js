import React from 'react';

const PrivateCode = ({ room, name, privateCodeCheck }) => {
  const [privateCode, setPrivateCode] = React.useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (privateCodeCheck === privateCode) {
      // let user join the specific room, else give an error
      return window.location.replace(`/chat?name=${name}&room=${room}`);
    } else {
      alert('The Private Code that you entered is invalid');
    }
  };
  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.3)',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        position: 'absolute',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <div>
          <form
            onSubmit={handleSubmit}
            style={{ backgroundColor: 'white', padding: '50px' }}
          >
            <input
              placeholder='Private Code(if applicable)'
              className='joinInput mt-20'
              type='text'
              value={privateCode}
              onChange={(e) => setPrivateCode(e.target.value)}
            />

            <button className={'button mt-20'} type='submit'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrivateCode;
