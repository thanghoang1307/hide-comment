export default function handler(req, res) {
    if (req.method == 'GET') {
        handlerGetMethod(req, res)
    } else {
        handlerPostMethod(req, res)
    }
}

  const handlerGetMethod = (req, res)  => {
    var token = process.env.TOKEN || 'token';
    if (
        req.query['hub.mode'] == 'subscribe' &&
        req.query['hub.verify_token'] == token
      ) {
        res.status(200).send(req.query['hub.challenge']);
      } else {
        res.status(400);
      }
    }

    const handlerPostMethod = (req, res) => {
        const config = process.env.CONFIG;
        const field = req.body.entry[0].changes?.[0]?.field;
        const page_id = req.body.entry[0].id;
        const page = config.data.find((page) => {
          return page.id == page_id;
        })  
      
        // Check if comment is added
        if (field) {
          received_updates.unshift(req.body);
          const item = req.body.entry[0].changes[0].value.item;
          const verb = req.body.entry[0].changes[0].value.verb;
          if (item == 'comment' && verb == 'add') {
            const comment_id = req.body.entry[0].changes[0].value.comment_id;
            hideComment(comment_id, page.access_token);
          }
        }
        res.status(200)
      }

    const hideComment = (comment_id, access_token) => {
        const url = `https://graph.facebook.com/v20.0/${comment_id}?is_hidden=true&access_token=${access_token}`;
        
        axios.post(url, null, { params: {is_hidden: true} }).then(response => {
            console.log(response)
        })
          .catch(error => {
            console.log(error)  // Truyền lỗi đến middleware xử lý lỗi
          });
      }
  
    