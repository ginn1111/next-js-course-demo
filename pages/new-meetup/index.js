import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetup = () => {
  const router = useRouter();

  const addMeetupHandler = useCallback(async (meetupData) => {
    await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    router.replace('/');
  }, []);
  return (
    <>
      <Head>
        <meta name="description" content="Add new meetup" />
        <title>New Meetup</title>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
