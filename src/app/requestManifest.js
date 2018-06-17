import axios from 'axios';
import lodash from 'lodash';

module.exports = (url, callback) {

   let dataReq = () => { return {}; };

   axios.get(url)
      .then( (response) => {

         dataReq.hasError = false;
         dataReq.data     = response.data;
         dataReq.status   = response.status;

         return callback ( null, dataReq);

      })
      .catch( (error) => {

         dataReq.hasError = true;

         if (error.response) {
            dataReq.data    = error.response.data;
            dataReq.status  = error.response.status;
            dataReq.message = 'An unexpected error occured';
         } else if ( error.request ) {
            dataReq.data   = '';
            dataReq.status = '';
            dataReq.message = 'The request was made but no response was received';
         } else {
            dataReq.data   = '';
            dataReq.status = '';
            dataReq.message = error.message;
         }

         return callback ( null, dataReq );

      });

}
