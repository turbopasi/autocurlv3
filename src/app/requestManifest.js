const axios = require('axios');
const Promise = require('promise');

export default function (url) {

   return new Promise( (resolve, reject) => {
      let manifest = {};

      axios.get(url)
         .then( (res) => {

            manifest = {
               hasError: false,
               data    : res.data,
               status  : res.status,
               message : '',
               renditions : 0,
               origin     : url
            };

            return resolve(manifest);

         })
         .catch( (error) => {

            manifest.hasError = true;
            manifest.data   = '';
            manifest.status = '';
            manifest.renditions = 0;
            manifest.origin   = url;

            if (error.response) {
               manifest.data    = error.response.data;
               manifest.status  = error.response.status;
               manifest.message = 'An unexpected error occured';
            } else if ( error.request ) {
               manifest.message = 'The request was made but no response was received';
            } else {
               manifest.message = error.message;
            }

            return reject(manifest);

         });

   });

}
