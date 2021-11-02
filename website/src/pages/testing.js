import React from 'react';
import Layout from '@theme/Layout';
import comingsoon from '../../static/img/comingsoon.png'

function Hello() {
  return (
    <Layout title="Hello">
      <div
      // style={{
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   height: '50vh',
      //   fontSize: '20px',
      // }}
      >
        {/* <img src={require('../../static/img/comingsoon.png')} /> */}
        <img src={comingsoon} />
        {/* <p>
          // Edit <code>pages/helloReact.js</code> and save to reload.
        </p> */}
      </div>
    </Layout>
  );
}

export default Hello;