<template>
	<div class="comment">
		<p>{{ content.rendered }}</p>
	</div>
</template>

<script>
export default {
	props: {
		id: {
			type: Number
		},
		parent: {
			type: Number
		},
		content: {
			type: String
		}
	}
}
</script>
<style>
.comment {
    display: block;
    padding: 1em;
    box-shadow: 0px 10px 13px -7px #000000, 50px 5px 15px 5px rgba(0, 0, 0, 0);
    border-radius: 3px;
    background-color: #fefefe;
    text-decoration: none;
    color: black;
    position: relative;
}
.comment:not(:last-child) {
    margin-bottom: 0.7em;
}
</style>