<template>
<div>
    <div id="headtodo">
        <div class="comment">
            <h4>Title :</h4>
            <div class="element_1">{{post.title.rendered}}</div>
        </div>
        <div class="comment">
        <h4>Descritpion :</h4>
        <div class="element_2">{{post.content.rendered}}</div>
        </div>
    </div>

    <div class="Comment">
    <h5>COMMENTS</h5>
            <div class="form-content">
                <textarea
                    id="commContent"
                    type="text"
                    placeholder="Comment"
                    name="Comment">
                </textarea>
            </div>
            <button @click="postComment()" class="button-icon">Ajouter ➕</button>
    <div>
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :id="comment.id"
        :content="comment.content"
        :parent="this.$route.params.id"
        />

      </div>
    </div>
</div>
</template>


<script>
import Comment from "@/components/CommentTrello.vue";
import { mapGetters } from "vuex";

export default {
    components: {
        Comment,
    },
    created() {
        this.$store.dispatch("fetchPosts");
        this.$store.dispatch("fetchComments");
    },
    computed: {
        ...mapGetters(["getCurrentPost", "getCommentByPost"]),

        post() {
            return this.getCurrentPost(this.$route.params.id);
        },
        comments() {
            return this.getCommentByPost(this.$route.params.id);
        },
    },
    methods:{
        postComment(){
            let contentComment = document.getElementById('commContent').value;
            this.$store.dispatch('newComment', this.$route.params, contentComment)
        }
    }
};
</script>


<style>
body {
    background: rgb(134, 135, 243);
    background: linear-gradient(
        48deg,
        rgba(134, 135, 243, 1) 15%,
        rgba(254, 134, 177, 1) 80%
    );
    background-attachment: fixed;
}
.Comment {
    display: flex;
    flex-direction: column;
    background: rgb(240, 236, 236);
    border-radius: 20px;
    width: 900px;
    min-height: 400px;
    text-align: center;
    margin: 8mm 8mm;
    padding: 4mm;
    overflow-wrap: break-word;
    margin: 30px auto 30px auto;
    box-shadow: 3px 3px 0 0;
}

.element_1 {
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 20px;
  margin: auto auto 10px auto;
}
#headtodo {
    display: flex;
    flex-direction: column;
    background: rgb(240, 236, 236);
    border-radius: 20px;
    width: 900px;
    min-height: 20px;
    text-align: center;
    margin: 8mm 8mm;
    padding: 4mm;
    overflow-wrap: break-word;
    margin: 30px auto 30px auto;
    box-shadow: 3px 3px 0 0;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
    margin: auto auto auto auto;
}
.element_2{
  font-size: 1.5em;
  text-align: center;
  overflow-wrap: break-word;
  margin: auto auto auto auto;
}
.button-icon {
  appearance: none;
  border: 0;
  background: none;
  font-size: 20px;
  float: right ;
  cursor: pointer;
  transition: transform 300ms;
}
h4 {
    text-align: center;
    overflow-wrap: break-word;
    margin: auto auto auto auto;
}
.button-icon {
    appearance: none;
    border: 0;
    background: none;
    font-size: 20px;
    margin-left: auto;
    cursor: pointer;
    transition: transform 300ms;
}
.button-icon:hover {
    transform: scale(1.1);
}
.form-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>