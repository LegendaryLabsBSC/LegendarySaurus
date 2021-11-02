import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        {/* <div><img src={('../../static/img/test-svgrepo-com.svg')} width={150} /> */}
        {/* <div><img src={('../../static/img/spellbook-book-svgrepo-com.svg')} width={150} /> */}
        {/* <div><img src={('../../static/img/book2.svg')} width={150} /> */}
        <div><img src={('../../static/img/laboratory-svgrepo-com.svg')} width={150} />

        </div>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started In The Lab🥼🧫⚗️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Legendary Labs`}
      description="Documentation for Legendary Labs Project">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
