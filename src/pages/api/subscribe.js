import axios from 'axios';

export default function handler(req, res) {
    const config = JSON.parse(process.env.NEXT_PUBLIC_CONFIG || {});
  const pages = config.data;
  pages.forEach(page => {
    axios({
      'method': 'POST',
      'url': `https://graph.facebook.com/${page.id}/subscribed_apps?subscribed_fields=feed&access_token=${page.access_token}`
    }).then(response => {
      res.status(200);
      console.log(response)
    })
      .catch(error => {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  })
  res.status(200);
  }