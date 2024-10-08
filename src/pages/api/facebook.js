import axios from 'axios';

export default function handler(req, res) {
    if (req.method == 'GET') {
        handlerGetMethod(req, res)
    } else {
        handlerPostMethod(req, res)
        return { "dummy": "data"}
    }
}

  const handlerGetMethod = (req, res)  => {
    var token = process.env.NEXT_PUBLIC_TOKEN || 'token';
    if (
        req.query['hub.mode'] == 'subscribe' &&
        req.query['hub.verify_token'] == token
      ) {
        res.status(200).send(req.query['hub.challenge']);
      } else {
        res.status(400).send('error');
      }
    }

    const handlerPostMethod = (req, res) => {
        const config = JSON.parse(process.env.NEXT_PUBLIC_CONFIG || {});
        const field = req.body.entry[0].changes?.[0]?.field;
        const page_id = req.body.entry[0].id;
        const page = config.data.find((page) => {
          return page.id == page_id;
        })
        
        console.log("Field: " + field);
        // Check if comment is added
        if (field) {
          const item = req.body.entry[0].changes[0].value.item;
          const verb = req.body.entry[0].changes[0].value.verb;
          console.log("Item: " + item);
          console.log("Verb: " + verb);
          if (item == 'comment' && verb == 'add') {
            const comment_id = req.body.entry[0].changes[0].value.comment_id;
            console.log("Comment ID: " + comment_id);
            console.log("Page ID: " + page.id);
            hideComment(comment_id, page.access_token);
            console.log('hidden')
          } else {
            console.log('not comment added')
        }
    }
    console.log('not feed')
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
  
    