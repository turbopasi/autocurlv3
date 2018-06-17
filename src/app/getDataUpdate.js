import requestManifest from './requestManifest';
import _ from 'lodash';
import Promise from 'promise';
import axios from 'axios';
import async from 'async';

/*
* manifest.hasError
* manifest.data
* manifest.status
* manifest.message / if hasError is true
* manifest.origin
* manifest.renditions
*/

export default function (url, callback) {

   requestManifest(url)
      .then( extractRenditions )
      .then( extractChunks )
      .then( (manifest) => {

         return callback(null, manifest);

      })
      .catch( (manifest) => {

         return callback(null, manifest);

      });

}

///////////////////////////////////
///////////////////////////////////

function extractRenditions (manifest) {

   return new Promise( (resolve) => {

      let array      = manifest.data.split('\n');
      let renditions = pullM3U8fromArray(array);

      renditions = renditions.length > 0 ? renditions : [{url: manifest.origin, chunks: []}];
      manifest.renditions = renditions;

      return resolve(manifest);

   });

}

function pullM3U8fromArray (arr) {
   let renditions = [];
   _.each( arr, (frag) => {
      if ( _.includes(frag, '.m3u8')) {
         renditions.push({
            url: frag,
            chunks: []
         });
      }
   });
   return renditions;
}

////////////////////////////////
////////////////////////////////

function extractChunks (manifest) {

   return new Promise( (resolve) => {

      async.map(manifest.renditions, chunkMe, () => {
         return resolve(manifest);
      });

   });

}

function chunkMe (rendition, callback) {
   axios.get(rendition.url)
      .then( (response) => {
         let array = response.data.split('\n');
         let chunks = pullTSfromArray(array);
         rendition.chunks = chunks;
         callback(null,rendition);
      })
      .catch( (error) => {
         callback(error, null);
      });
}

function pullTSfromArray (arr) {
   let chunks = [];
   _.each( arr, (frag) => {
      if ( _.includes(frag, '.ts')) {
         chunks.push(frag);
      }
   });
   return chunks;
}
