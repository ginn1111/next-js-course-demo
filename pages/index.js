import MeetupList from '../components/meetups/MeetupList';
import Head from 'next/head';
import DbHandler from '../db';

const HomePage = ({ meetups }) => {
  return (
    <>
      <Head>
        <meta name="description" content="This is the site for meetup cities" />
        <title>Meetups</title>
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
};

/* export function getServerSideProps({req, res}) { */
/*   console.log({req, res}) */
/*   return { */
/*     props: { */
/*       meetups: DUMMY_MEETUP */
/*     } */
/*   } */
/* } */

export async function getStaticProps() {
  const response = await DbHandler(async (db) => {
    const meetupsCollection = db.collection('meetups');
    return await meetupsCollection.find().toArray();
  });

  return {
    props: {
      meetups: response.map(({ image, title, address, _id }) => ({
        image,
        title,
        address,
        id: _id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
