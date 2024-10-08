export default function handler(req, res) {
    const config = JSON.parse(process.env.CONFIG || {});
  const pages = config.data;
  pages.forEach(page => {
    axios({
      'method': 'POST',
      'url': `https://graph.facebook.com/${page.id}/subscribed_apps?subscribed_fields=feed&access_token=${page.access_token}`
    }).then(response => {
      response.status(200);
    })
      .catch(error => {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  })
  res.status(200);
  }