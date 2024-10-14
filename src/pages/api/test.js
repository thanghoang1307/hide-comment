import axios from 'axios';

export default function handler(req, res) {
    const url = `https://graph.facebook.com/v21.0/563169416286258_887469166656567?is_hidden=true&access_token=EAARU93ZChWsABO0Enaq6ZBNiOfN7CGj3UXYkFtnkYtC9SVqFZBI6JyR37MLH8wo8tCD0QeTl6wwFXqoPyHw6uPfiuyS78AA90TluMA6pH0UApVrm4SvcKAQObkGvVeni0ZCgEQJhObCW7fNAJEfWtD3iO2HZAkcvEZAl8udhHn13UHi1ZBTHHzJb3ljeEu6V8oZD`;
        
        axios.post(url, null, {timeout: 10000})
          .then(response => {
            console.log(response)
            res.json(response)
        })
          .catch(error => {
            res.json(error)
          });
}