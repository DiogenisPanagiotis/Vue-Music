<template>
    <div class='container'>
      <div class="row">
        <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3">
          <br>
            <div class='filter'>
              <input type='text' v-on:keyup.enter='searchAlbums()' class='form-control fontAwesome' id="query" placeholder="&#xf002;"></input>
            </div>
            <br>
            <iframe :src="iframeSource" width="555" height="300" frameborder="0" allowtransparency="true"></iframe>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-xs-11 col-xs-offset-1  col-sm-6 col-sm-offset-3">
            <div class='albums' v-for="album in albums">
              <img @click='playAlbum' class='rounded' height='127' width='127' :src='album[0]' :albumId='album[2]' :alt='album[1]'>  
            </div>
            <div class='albums' v-for="track in tracks">
              <img @click='playAlbum' class='rounded' height='127' width='127' :src='track[0]' :albumId='track[2]' :alt='track[1]'>  
            </div>
        </div>
      </div>
    </div>
</template>

<script>
  import $ from 'jquery';
  let audioObject = null;

  export default {
    data(){
      return {
        albums: [],
        tracks: [],
        iframeSource: ''
      }
    }, 
    methods: {
      searchAlbums: function(query){
        this.albums = [];
        query = document.getElementById('query').value;
        let that = this;

        this.$http.get('https://api.spotify.com/v1/search', {params:  {query: query, type: 'album'}})
          .then(res => {
            console.log(res.body);
            for (var i = 0; i < res.body.albums.items.length; i++){
              let image = res.body.albums.items[i].images[0].url;
              let title = res.body.albums.items[i].name;
              let albumId = res.body.albums.items[i].id;
              that.albums.push([image, title, albumId]);
            }
            let iframeSource = 'https://embed.spotify.com/?uri=spotify:album:' + that.albums[0][2] + '&theme=white';
            this.iframeSource = iframeSource;
            this.searchTracks(query);
        });
      },
      searchTracks: function(query){
        this.tracks = [];
        query = document.getElementById('query').value;
        let that = this;

        this.$http.get('https://api.spotify.com/v1/search', {params:  {query: query, type: 'track'}})
          .then(res => {
            for (var i = 0; i < res.body.tracks.items.length; i++){
              let image = res.body.tracks.items[i].album.images[0].url;
              let title = res.body.tracks.items[i].name;
              let albumId = res.body.tracks.items[i].album.id;
              that.tracks.push([image, title, albumId]);
            }
        });
      },
      fetchTracks: function (albumId, cb) {
        this.$http.get('https://api.spotify.com/v1/albums/' + albumId)
          .then(res => {
            cb(res.body);
          });
      },
      playAlbum: function(e){
        let targ = e.target;
        let playing = 'playing';
        let iframeSource = 'https://embed.spotify.com/?uri=spotify:album:' + targ.getAttribute('albumId') + '&theme=white';
        this.iframeSource = iframeSource;

         if (targ !== null) {
          if (targ.classList.contains(playing)){
              audioObject.pause();
          } else {
            if (audioObject){
                audioObject.pause();
            }
            this.fetchTracks(targ.getAttribute('albumId'), function(data){
                audioObject = new Audio(data.tracks.items[0].preview_url);
                audioObject.play();
                targ.classList.add(playing);
                audioObject.addEventListener('ended', function(){
                    targ.classList.remove(playing);
                });
                audioObject.addEventListener('pause', function(){
                    targ.classList.remove(playing);
                });
            });
          }
        } 
      }
    }
  }
</script>

<style scoped>
  .filter {
    padding: 40px;
    background: #efefef;
    border-radius: 3px;
  }
  h5 {
    display: inline;
  }
  .albums {
    padding-left: 10px;
    display: inline;
  }
  .rounded {
    border-radius: 3px;
    margin-bottom: 10px;
  }
  .rounded:hover {
    cursor: pointer;
  }
  .playing {
    border: 5px solid #fff;
    border-radius: 8px;
    opacity: 0.5;
  }
  input {
    border-radius: 1px;
  }
  input:focus {
    border: 1px solid #ccc;
    box-shadow: none;
  }
  .fontAwesome {
    font-family: 'Helvetica', FontAwesome, sans-serif;
  }
  iframe {
    /*border: 10px solid #fff;*/
    /*border: 5px;
    border-radius: 5px;
    border-color: #efefef;*/
    /*margin-left: 125px;*/
  }
</style>