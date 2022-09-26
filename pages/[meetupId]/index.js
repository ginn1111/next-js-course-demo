import Head from 'next/head';
import { ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import DbHandler from '../../db';

const MeetupDetailPage = ({ title, image, address, description }) => {
  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <title>{title}</title>
      </Head>
      <MeetupDetail
        image={image}
        title={title}
        description={description}
        address={address}
      />
    </>
  );
};
export async function getStaticPaths() {
  const meetupIds = await DbHandler(async (db) => {
    const meetupCollection = db.collection('meetups');
    return await meetupCollection.find().toArray();
  });
  return {
    fallback: false,
    paths: meetupIds.map(({ _id }) => ({
      params: { meetupId: _id.toString() },
    })),
  };
}
export async function getStaticProps(context) {
  const { meetupId } = context.params;

  const selectedMeetup = await DbHandler(async (db) => {
    const meetupCollection = db.collection('meetups');
    return await meetupCollection.findOne({ _id: ObjectId(meetupId) });
  });

  return {
    props: {
      id: selectedMeetup._id.toString(),
      image: selectedMeetup.image,
      title: selectedMeetup.title,
      description: selectedMeetup.description,
      address: selectedMeetup.address,
    },
  };
}
export default MeetupDetailPage;
