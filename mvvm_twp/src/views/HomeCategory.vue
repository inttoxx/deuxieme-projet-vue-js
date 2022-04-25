<template>
  <div class="main-nav">
    <input
      id="catName"
      type="text"
      style="font-size: 1.5em"
      placeholder="Create a category"/>
    <button 
      class="btn btn-secondary" 
      @click="newCategories()">
        New Category➕
    </button>
  </div>

  <div class="dashBoard">
    <Category
      v-for="cat in categories"
      :key="cat.name"
      :id="cat.id"
      :name="cat.name"
      :class="[
                'cat',
            ]"
    />
  </div>

    <Auth v-if="!user"/>
  
</template>

<script>
import Category from "@/components/CategoryTrello.vue";
import Auth from "@/components/BasicAuth.vue";
import { mapState } from "vuex";

export default {
  components: {
    Category,
    Auth,
  },
  created() {
    this.$store.dispatch("fetchCategories");
    this.$store.dispatch("fetchPosts");
    this.$store.dispatch("fetchComments");
    this.$store.dispatch("login");
  },
  computed: {
    ...mapState(["categories", "user"]),
  },
  methods: {
    newCategories() {
      let catName = document.getElementById('catName').value
      this.$store.dispatch("newCategories", catName);
    },
  },
};
</script>

<style>
.dashBoard{
  display: flex;
  flex-wrap: wrap;
}
body {
  background: rgb(134, 135, 243);
  background: linear-gradient(
    48deg,
    rgba(134, 135, 243, 1) 15%,
    rgba(254, 134, 177, 1) 80%
  );
  background-attachment: fixed;
}
#bg {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.main-nav {
  display: flex;
  float: inline-start;
  text-align: center;
  padding: 3mm 3mm;
  text-decoration: none;
  margin: auto auto auto auto;
}

.cat {
  flex-direction: column;
  background: rgb(240, 236, 236);
  border-radius: 10px;
  width: 300px;
  min-height: 198px;
  text-align: left;
  margin: 5mm 5mm;
  padding: 3mm;
  overflow-wrap: break-word;
}
input {
  width: 50%;
  margin: 0.1em 0.1em;
}
.cat button {
  float: right;
}
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
#btn {
  margin-left: right;
}
</style>
