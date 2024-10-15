import axios from 'axios';

export default async function handler(req, res) {
  try {
    if (req.method == 'GET') {
      handlerGetMethod(req, res);
    } else {
      const result = await handlerPostMethod(req, res);
      console.log(result);
        res.status(200).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
}

const handlerGetMethod = (req, res) => {
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

const handlerPostMethod = async (req, res) => {
  try {
    const config = JSON.parse(process.env.NEXT_PUBLIC_CONFIG || {});
    const field = req.body.entry[0].changes?.[0]?.field;
    const page_id = req.body.entry[0].id;
    const page = config.data.find((page) => {
      return page.id == page_id;
    })

    if (field) {
      const item = req.body.entry[0].changes[0].value.item;
      const verb = req.body.entry[0].changes[0].value.verb;
      if (item == 'comment' && verb == 'add') {
        const comment_id = req.body.entry[0].changes[0].value.comment_id;
        const data = await hideComment(comment_id, page.access_token);
        return { success: true, message: data };
      } else {
        return { success: true, message: 'not comment' };
      }
    } else {
      return { success: true, message: 'not feed' };
    }
  } catch (error) {
    throw(error)
  }
}

async function hideComment(comment_id, access_token) {
  try {
    const url = `https://graph.facebook.com/v21.0/${comment_id}?is_hidden=true&access_token=${access_token}`;
    const response = await axios.post(url, null, { timeout: 10000 });
    return response;
  } catch (error) {
    if (error.response) {
      const { code, error_subcode, error_user_msg } = error.response.data.error;
      
      // Kiểm tra mã lỗi và thông báo lỗi cụ thể
      if (code === 1 && error_subcode === 1446036 && error_user_msg === "Comment is already marked as spam. Duplicate request to mark comment as spam.") {
          console.log('Trường hợp này không phải là lỗi. Comment đã được đánh dấu spam trước đó.');
          return 'Marked as spam';
      } else {
          throw error;
      }
    } else {
      throw error;
  }
  }
}


