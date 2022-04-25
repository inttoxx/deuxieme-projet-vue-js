<template>
    <div class="post">
        <router-link :to="{ name: 'post', params: { id: id } }">
            <h4>{{ title }}</h4>
        </router-link>

        <button @click="delPosts(id)" class="btn btn-danger btn-sm">🗑️</button>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        },
    },
    methods: {
        delPosts(id) {
            this.$store.dispatch("delPosts", id);
        },
    },
};
</script>

<style scoped>
.post {
    display: block;
    padding: 1em;
    box-shadow: 0px 10px 13px -7px #000000, 50px 5px 15px 5px rgba(0, 0, 0, 0);
    border-radius: 3px;
    background-color: #fefefe;
    text-decoration: none;
    color: black;
    position: relative;
}
.post:not(:last-child) {
    margin-bottom: 0.5em;
}
.delPost{
	position:float;
  }
  
</style>