<template>
    <div class="main"> 
        <div class="category">
            <button @click="delCategories(id)" id="btn" class="btn btn-danger btn-sm">🗑️</button>
            <button @click="update(id)" id="btn" class="btn btn-success btn-sm">upd</button>
            <h2 contenteditable="true" id="catTitle">{{ name }}</h2>
        </div>

        <Post
			v-for="post in posts"
			:key="post.id"
			:title="post.title.rendered"
			:id="post.id"
        />
        <button @click="newPost(id)" class="btn btn-success">Add Post</button>
         </div>
       
        
   
</template>

<script>
import Post from './PostTrello.vue'
import { mapGetters } from 'vuex';


export default {
    components: {
        Post,
    },
    props: {
        name: {
            type: String,
        },
        id: {
            type: Number,
        },
    },
    computed: {

        ...mapGetters([
            'getPostsByCat'
        ]),

        posts () {
            return this.getPostsByCat(this.id);
        }
    },
    methods: {
        delCategories(id) {
            this.$store.dispatch("delCategories", id);
        },
        newPost(id) {
            this.$store.dispatch("newPost", id);
        },
        update() {
            let catName = document.getElementById('catTitle').innerText;
            console.log(catName);
            this.$store.dispatch("updateCategories", this.id, catName);
        },
    }
};
</script>

<style>

.main{
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: rgb(240, 236, 236);
  border-radius: 10px;
  width: 300px;
  min-height: 198px;
  text-align: left;
  margin: 5mm 5mm;
  padding: 3mm;
  overflow-wrap: break-word;
 }
 .newpost{
     display:flex;

 }
 .AddPost{
position:auto;

 }
    
</style>