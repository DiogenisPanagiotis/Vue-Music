<template>
    <div class='container'>
      <div class="row">
        <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3">
          <br>
            <div class='head'>
              <span class="glyphicon glyphicon-tint" aria-hidden="true"></span>
            </div>
            <br>
            <div class='filter'>
              <input type='text' v-on:keyup.enter='searchAlbums()' class='form-control fontAwesome' id="query" placeholder="&#xf002; Search for albums or tracks"></input>
            </div>
            <br>
            <iframe :src="iframeSource" width="555" height="300" frameborder="0" allowtransparency="true"></iframe>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-xs-11 col-xs-offset-1  col-sm-6 col-sm-offset-3">
            <div v-if='startPage' class='albums' v-for="newRelease in newReleases">
              <img @click='playAlbum' class='rounded' height='127' width='127' :src='newRelease[0]' :albumId='newRelease[2]' :alt='newRelease[1]'>  
            </div>
            <div class='albums' v-for="album in albums">
              <img @click='playAlbum' class='rounded' height='127' width='127' :src='album[0]' :albumId='album[2]' :alt='album[1]'>  
            </div>
            <div class='albums' v-for="track in tracks">
              <img @click='playAlbum' class='rounded' height='127' width='127' :src='track[0]' :albumId='track[2]' :alt='track[1]'>  
            </div>
            <div class='footer'>
              <!--<h5 class='madeWith'>MADE WITH <span class="glyphicon glyphicon-heart" aria-hidden="true"></span> USING VUE.JS<h5>-->
              <h5 class='madeWith'>POWERED BY VUE.JS<h5>
            </div>
            <div class='footer2'>
              <div class='row'>
                <div class='col-sm-12'>
                  <div class='col-sm-3 col-sm-offset-3'>
                    <h6><a href='mailto:diogenis.panagiotis@gmail.com'>Email</a><h6>
                    <h6><a href='linkedin.com/in/DiogenisPanagiotis'>LinkedIn</a><h6>
                  </div>
                  <div class='col-sm-3 col-sm-offset-1'>
                    <h6><a href='github.com/DiogenisPanagiotis'>Github</a><h6>
                    <h6><a href='angel.co/diogenispanagiotis'>Angel</a><h6>
                  </div>
                </div>
              </div>
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
        startPage: true,
        iframeSource: '',
        newReleases: [
          ["https://i.scdn.co/image/f56f23cbd3783f8594a4871ca0424ffb9de7a5cd", "Culture", "2AvupjUeMnSffKEV05x222"],
          ["https://i.scdn.co/image/990f7ee5c06a8d53c89fbf01a8237fd82a5d7580", "SweetSexySavage (Deluxe)", "4B4in9QlrlYWSHlYSRebdC"],
          ["https://i.scdn.co/image/fdf1443bb7b2d6a3a6bb458bd5a1a2079a50e39c", "Run Up", "5tk1rHDB0ZcqTAU7XDqKwA"],
          ["https://i.scdn.co/image/9d838ad5190c61ff09be379040addb53597b7f2d", "Scared To Be Lonely", "2v9rQe4F8fVSh5v8bAq0jF"],
          ["https://i.scdn.co/image/0b7ccca6cefb6724b7c8079fa6fc3900b4fd7623", "Three Stripes =", "1tRQI1V8yRxXp6BjwXrT73"],
          ["https://i.scdn.co/image/05d37ef973cea3a00c7394ba080e61ce69a774a7", "So Good", "1ARNgMt8ImDsEZyjgjyntF"],
          ["https://i.scdn.co/image/a8f82298052fdfd8048833785125e540037de0eb", "a girl a bottle a boat", "26OJfCFh7u9WmHd3Y3q8IS"],
          ["https://i.scdn.co/image/a8f82298052fdfd8048833785125e540037de0eb", "Stay Lonely", "4hkTlNKpcO5IEakjAq5hik"],
          ["https://i.scdn.co/image/bcc19aae19d5cad1792128d963b0d728c6469365", "Road Less Traveled", "296hswDnxvymjboFBxvmI5"],
          ["https://i.scdn.co/image/06976979b4098f0270aa12c8f25ce5e25f647083", "Keep Your Eyes On Me", "06o6awRCJVegIhDkg1tZUy"],
          ["https://i.scdn.co/image/583e15a010fdce0fe18fa56d3272a5f78a4686a8", "Pure Comedy", "42Jk84IC8I3dIDtA0mqhaR"],
          ["https://i.scdn.co/image/552ccf50cd572d2bfa251c39aac760158601b707", "Near To The Wild Heart Of Life", "26hqnB0XF1ZFc31zY6NAgf"],
          ["https://i.scdn.co/image/c43eb06a4b468177e7278a3339f53f6d03227648", "Cave Me In", "3no6YVGaUUBPQjfeUbajXL"],
          ["https://i.scdn.co/image/9fbe99dd3330b2b7e855c853ec31f7c6c9a6c6e0", "I'm Better (feat. Lamb)", "2gwnDKLNmXaF1LYVxRiRmB"],
          ["https://i.scdn.co/image/b760eb0acb0f779f84e01d79767e744a4979c6fe", "Trouble", "5l0jX2G4qAtBM6bw22iVDn"],
          ["https://i.scdn.co/image/4425c30edd285fca42038d8afe1e1d52fd529e13", "I Think She Like Me", "5M8Yvdw3908JEtUpEZ9VOo"],
          ["https://i.scdn.co/image/5ac2625ac3691e6d9809fc856fdcec34d65d90cc", "Love Is Alive", "0i7gI9SlKIZxdz2Jl2dyfp"],
          ["https://i.scdn.co/image/cee9e087fe1bea0a52f2e5ee4f28c5aeaa6c6007", "Darling", "45zccaZrkPvaq6kIDYo0pz"],
          ["https://i.scdn.co/image/ef2d5556a5d6afb5f148e9181ae668ea4b14c1c5", "Three Worlds: Music From Woolf Works", "4fo551Vy3KXbbRxRlVTD9D"],
          ["https://i.scdn.co/image/a2ff14065f68b8e7f9584c6d18866b002ca6b866", "Life Without Sound", "4xT80zh4DhVGVdc3QTObav"]
        ]
      }
    }, 
    mounted(){
      this.getNewReleases();
    },
    methods: {
      searchAlbums: function(query){
        this.albums = [];
        query = document.getElementById('query').value;
        let that = this;
        this.startPage = false;

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
            that.iframeSource = iframeSource;
            that.searchTracks(query);
        });
      },
      getNewReleases: function(){
        let iframeSource = 'https://embed.spotify.com/?uri=spotify:album:' + this.newReleases[0][2] + '&theme=white';
        this.iframeSource = iframeSource;
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
  .head {
    height: 100px;
    width: 555px;
    border-radius: 3px;
    background-color: #7C5CD1;
    /*background-color: #3897f0;*/
  }
  .glostick {
    background: linear-gradient(to right, #8D728A, #F17A87);
    border-radius: 3px;
    width: 555px;
    height: 100px;
  }
  .glyphicon-tint {
    padding-top: 37px;
    padding-left: 272px;
    font-size: 1.7em;
    color: #fff;
  }
  .glyphicon-tint:hover {
    color: #4D3982;
  }
  .filter {
    padding: 40px;
    background: #efefef;
    border-radius: 3px;
  }
  h5 {
    font-family: 'Roboto';
    color: #fff;
    text-align: center;
    padding-top: 43px;
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
  .footer {
    height: 100px;
    width: 555px;
    border-radius: 3px;
    background-color: #7C5CD1;
  }
  .footer2 {
    height: 100px;
    width: 555px;
    border-radius: 3px;
    background-color: #3A3F44;
    margin-top: 15px;
    margin-bottom: 20px;
  }
  .madeWith {
    /*color: #4D3982;    */
    font-size: 14px;
    color: #fff;    
  }
  a {
    color: #fff;
  }
  h6 {
    font-size: 11px;
  }
  .col-sm-3 {
    padding-top: 25px;
  }
</style>
