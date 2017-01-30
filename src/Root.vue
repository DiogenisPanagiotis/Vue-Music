<template>
    <div class='container'>
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <br>
            <div class='filter'>
              <input type='text' v-on:keyup.enter='search()' class='form-control fontAwesome' id="query" placeholder="&#xf002;"></input>
            </div>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <div class='albums' v-for="album in albums">
              <img @click='playAlbum' class='rounded' height='127' width='127' :src='album[0]' :albumId='album[2]' :alt='album[1]'>  
            </div>
            <div id="results"></div>
        </div>
      </div>
    </div>
</template>

<script>
  let apiUrl = 'https://api.diffbot.com/v3/article?token=85d8d8153c7cc8c0e7ad942e48962737&url=';
  let clientID = 'a070e36c949448e7bc86260892b70b9d';
  let clientSecret = 'ee10c8bfe56348489c68d64dd702a9ce';
  let resultsPlaceholder = document.getElementById('results');
  let audioObject = null;
  import $ from 'jquery';

  export default {
    data(){
      return {
        albums: [],
        liveFilter: ''
      }
    }, 
    mounted(){
      this.getArticles();
    },
    computed: {
      cool: function(){
        return this.albums;
      }
    },
    methods: {
      getArticles: function(){
        // this.$http.get(apiUrl + 'http://blog.diffbot.com/diffbots-new-product-api-teaches-robots-to-shop-online')
        // this.$http.get('https://api.spotify.com/v1/search/wayne')
        // .then(res => {
        //   console.log('API RESPONSE: ', res.body);
        //   // this.articles = res.body.objects[0]; unhide this one
        //   // console.log(this.articles.images[0].url, 'yooo');
        // }, err => {
        //   console.log(err);
        // });
      },
      search: function(query){
        this.albums = [];
        query = document.getElementById('query').value;
        let that = this;
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'album'
            },
            success: function (res) {
                for (var i = 0; i < res.albums.items.length; i++){
                  let image = res.albums.items[i].images[0].url;
                  let title = res.albums.items[i].name;
                  let albumId = res.albums.items[i].id;
                  that.albums.push([image, title, albumId]);
                }
            }
        });
      },
      fetchTracks: function (albumId, cb) {
        $.ajax({
          url: 'https://api.spotify.com/v1/albums/' + albumId,
          success: function (res) {
              cb(res);
          }
        });
      },
      playAlbum: function(e){
        let targ = e.target;
        let playing = 'playing';

         if (targ !== null) {
          if (targ.classList.contains(playing)) {
              audioObject.pause();
          } else {
            if (audioObject) {
                audioObject.pause();
            }
            this.fetchTracks(targ.getAttribute('albumId'), function (data) {
                audioObject = new Audio(data.tracks.items[0].preview_url);
                audioObject.play();
                targ.classList.add(playing);
                audioObject.addEventListener('ended', function () {
                    targ.classList.remove(playing);
                });
                audioObject.addEventListener('pause', function () {
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
    border-radius: 5px;
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
    border-radius: 3px;
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
</style>