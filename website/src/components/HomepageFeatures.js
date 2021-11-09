import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Check Updates',
    Svg: require('../../static/img/update-repeat-svgrepo-com.svg').default,
    description: (
      <>
        See any updates regarding the Legendary Labs project all in one place!
      </>
    ),
  },
  {
    title: 'Add To Our Docs',
    Svg: require('../../static/img/color-note.svg').default,
    description: (
      <>
        Easy how-to for adding to our main docs.
        <br />
        Coming Soon!
      </>
    ),
  },
  {
    title: 'Testing Portal',
    Svg: require('../../static/img/test-tube-svgrepo-com.svg').default,
    description: (
      <>
        Access the Testing Portal to certify new features before they are added to production.
        <br />
        Coming Soon!
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}


export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
