import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Page Not Found</h1>
          <p>Ouch, I haven't found the link you're looking for</p>
          <Link to="/" className="button button--link">HEAD HOME</Link>
        </div>
      </div>
    );
};
