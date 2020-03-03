import React from 'react';

const Footer = () => {
  return (
    <footer className="footer has-background-white">
      <div className="content has-text-centered">
        <p>
          Built with <a href="https://reactjs.org/">React</a> ·{' '}
          <a href="https://www.coingecko.com/api">CoinGecko API</a> ·{' '}
          <a href="https://www.chartjs.org/">Chart.js</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
