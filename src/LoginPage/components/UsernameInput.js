import React from 'react';

const UsernameInput = (props) => {
  const { username, setUsername, handleSubmitButtonPressed, getPassword, userPwd, setUserPwd } = props;

  return (
    <div>
      <div className='p-2 input-group'>
        <span className='font_weight_500 p-1 text-light '>Username* :</span>
        <input
          type='text'
          value={username}
          onChange={(event) => { setUsername(event.target.value); }}
          className='p-1 m-1 form-control rounded'
        />
      </div>
      <div className='p-2 input-group'>
        <span className='font_weight_500 p-1 text-light'>Password* :</span>
        <input
          type='text'
          value={userPwd}
          onChange={(event) => { getPassword(event.target.value); }}
          className='p-1 m-2 form-control rounded'
        />
      </div>
      <div className='p-2 text-center'>
          <button
          className='p-1 px-2 m-2 btn btn-light btn-outline-secondary'
          onClick={handleSubmitButtonPressed}
            >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default UsernameInput;
