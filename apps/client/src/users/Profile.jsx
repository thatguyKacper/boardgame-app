import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const { id } = useParams();

  useEffect(() => {
    const credentials = JSON.parse(sessionStorage.getItem('jwt'));

    const read = async () => {
      try {
        const res = await fetch(`/api/profile/${id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + credentials,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    read();
  }, [id]);

  return <div>Profile</div>;
}
