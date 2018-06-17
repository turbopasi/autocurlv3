import requestManifest from './requestManifest';
import _ from 'lodash';

/*
* manifest.hasError
* manifest.data
* manifest.status
* manifest.message
*/

export default function (url, callback) {

   let data = {
      stats: {},
      chunks: {},
      checks: {}
   }

   requestManifest(url, (err, manifest) => {
      if (err) { return callback(err, null); }

      data.stats.status     = manifest.status;
      data.stats.renditions = getRenditions(manifest);

      return callback(null, data);
   });

}

///////////////////////////////////

function getRenditions (manifest) {

   const split = manifest.data.split('\n');
   let renditions = [];
   _.each( split, (frag) => {
      if ( _.includes(frag, '.m3u8')) {
         renditions.push(frag);
      }
   });

   return renditions;

}
