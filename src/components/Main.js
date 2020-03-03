import React, { useState, useEffect } from 'react';

import Card from './Card';
import Spinner from './Spinner';

const URL = 'https://api.coingecko.com/api/v3/coins/markets?';
const params = {
  vs_currency: 'usd',
  order: 'market_cap_desc',
  per_page: 6,
  page: 1,
  sparkline: true,
  price_change_percentage: '1h,24h',
};

const Main = () => {
  const [cryptos, setCryptos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const loadMoreData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${URL}${new URLSearchParams({
          ...params,
          page,
        })}`
      );
      const data = await res.json();
      setCryptos([...cryptos, ...data]);
      setPage(page + 1);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${URL}${new URLSearchParams(params)}`);
        const data = await res.json();
        setInitialLoad(false);
        setCryptos(data);
        setPage(2);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [setIsLoading]);

  return (
    <main>
      <section className="section">
        <div className="container">
          <h1 className="is-size-1">Crypto Stats</h1>
          <h2 className="subtitle has-text-grey">
            Top crypto assets by market capitalization
          </h2>
          {initialLoad ? (
            <div
              className="is-flex justify-center align-center"
              style={{ height: '55vh' }}
            >
              <Spinner />
            </div>
          ) : (
            <div className="columns is-multiline">
              {cryptos.map(item => (
                <div
                  key={item.id}
                  className="column is-half-tablet is-one-third-desktop"
                >
                  <Card data={item} />
                </div>
              ))}
            </div>
          )}
        </div>

        {!initialLoad && (
          <div className="is-flex justify-center " style={{ marginTop: 30 }}>
            <button
              onClick={loadMoreData}
              className={`button is-primary ${isLoading && 'is-loading'}`}
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Main;
