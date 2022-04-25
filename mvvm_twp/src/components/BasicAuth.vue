<template>
     <div class="login">
        <h5>Login</h5>
        <input id="user" type="text">
        <h5>Password</h5>
        <input id="password" type="password">
        <button @click="connect">connect</button>
    </div>
</template>

<script>
    export default {
        methods: {
            connect () {
                const user = document.getElementById('user').value;
                const pass = document.getElementById('password').value;
                localStorage.user = "Basic "+ btoa(user + ":" + pass);
                console.log(localStorage.user);
                this.$store.dispatch('login');
            }
        },
    }
</script>

<style>
    .login{
    background: rgb(240, 236, 236);
    border-radius: 10px;
    width: 300px;
    min-height: 198px;
    text-align: left;
    margin: 5mm 5mm;
    padding: 3mm;
    overflow-wrap: break-word;
    position: absolute;
    top: 100px;
    left: 775px;
    box-shadow: 0px 10px 13px -7px #000000, 1px 12px 50px 10px #000000;
}
.login button{
    position: absolute;
    bottom: 10px;
    right: 10px;
}
</style>