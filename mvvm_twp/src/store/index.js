import { createStore } from "vuex";

const store = createStore({
	state: {
		categories: [],
		posts: [],
		comments: [],
		user: "",
	},
	mutations: {
		fetchCategories(state, categories) {
			state.categories = categories;
		},

		fetchPosts(state, posts) {
			state.posts = posts;
		},

		fetchComments(state, comments) {
			state.comments = comments;
		},

		setCurrentPost(state, post) {
			state.currentPost = post;
		},
		setUser(state, user) {
			state.user = user;
		},
	},
	actions: {
		async login({ commit }) {
			const user = await localStorage.user;
			commit("setUser", user);
		},
		
		async fetchCategories({ commit }) {
			const queryCat = await fetch(
				"http://localhost:8080/wp-json/wp/v2/categories"
			);
			const categories = await queryCat.json();
			commit("fetchCategories", categories);
		},

		async fetchPosts({ commit }) {
			const queryPosts = await fetch(
				"http://localhost:8080/wp-json/wp/v2/posts"
			);
			const posts = await queryPosts.json();
			commit("fetchPosts", posts);
		},

		async fetchComments({ commit }) {
			const queryComm = await fetch(
				"http://localhost:8080/wp-json/wp/v2/comments"
			);
			const comments = await queryComm.json();
			commit("fetchComments", comments);
		},

		newCategories({ state }, catName) {
			var myHeaders = new Headers();
			myHeaders.append("Authorization", "Basic dmFsZW50aW46UGNlZ2NlY3QyMjA5IQ==");
			myHeaders.append("Content-Type", "application/json");

			const newCat = {
				name: catName,
			};
			var raw = JSON.stringify(newCat);

			var requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			};

			fetch("http://localhost:8080/wp-json/wp/v2/categories", requestOptions)
				.then((response) => response.json())
				.then((result) => state.categories.push(result))
				.catch((error) => console.log("error", error));
		},

		newPost({ state }, catId) {
			var myHeaders = new Headers();
			myHeaders.append("Authorization", "Basic dmFsZW50aW46UGNlZ2NlY3QyMjA5IQ==");
			myHeaders.append("Content-Type", "application/json");

			const newPost = {
				title: "New Post",
				content: "Description of your post",
				status: "publish",
				comment_status: "open",
				categories: catId,
			};

			var raw = JSON.stringify(newPost);

			var requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			};

			fetch("http://localhost:8080/wp-json/wp/v2/posts", requestOptions)
				.then((response) => response.json())
				.then((result) => state.posts.push(result))
				.catch((error) => console.log("error", error));
		},

		async newComment({ state }, postId, content) {
			var myHeaders = new Headers();
			myHeaders.append("Authorization", "Basic dmFsZW50aW46UGNlZ2NlY3QyMjA5IQ==");
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
				"content": content,
				"post": postId
			});

			var requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			};

			fetch("http://localhost:8080/wp-json/wp/v2/comments", requestOptions)
				.then((response) => response.json())
				.then((result) => state.comments.push(result))
				.catch((error) => console.log("error", error));
		},

		updateCategories({ state }, catId, newTitle) {
			var myHeaders = new Headers();
			myHeaders.append("Authorization", "Basic dmFsZW50aW46UGNlZ2NlY3QyMjA5IQ==");
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
				name: newTitle,
			});

			var requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			};

			fetch("http://localhost:8080/wp-json/wp/v2/comments/" + catId, requestOptions)
				.then((response) => response.json())
				.then(() => {
					for (const category of state.categories) {
						if (category.id === catId) {
							category.name = newTitle;
						}
					}
				})
				.catch((error) => console.log("error", error));
		},

		updatePosts({ state }, postId, newTitle, newContent) {
			var myHeaders = new Headers();
			myHeaders.append("Authorization", "Basic dmFsZW50aW46UGNlZ2NlY3QyMjA5IQ==");
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
				title: {
					rendered: newTitle,
				},
				content: {
					rendered: newContent,
				},
			});

			var requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			};

			fetch("http://localhost:8080/wp-json/wp/v2/posts/" + postId, requestOptions)
				.then((response) => response.json())
				.then(() => {
					for (const post of state.posts) {
						if (post.id === postId) {
							post.title.rendered = newTitle;
							post.content.rendered = newContent;
						}
					}
				})
				.catch((error) => console.log("error", error));
		},

		updateComments({ state }, commId, newContent) {
			var myHeaders = new Headers();
			myHeaders.append("Authorization", "Basic dmFsZW50aW46UGNlZ2NlY3QyMjA5IQ==");
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
				content: {
					rendered: newContent,
				},
			});

			var requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			};

			fetch("http://localhost:8080/wp-json/wp/v2/comments/" + commId, requestOptions)
				.then((response) => response.json())
				.then(() => {
					for (const comment of state.comments) {
						if (comment.id === commId) {
							comment.content.rendered = newContent;
						}
					}
				})
				.catch((error) => console.log("error", error));
		},

		async delCategories({ state }, catId) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic dmFsZW50aW46UGNlZ2NlY3QyMjA5IQ==");
            myHeaders.append("Content-Type", "application/json");

            return fetch(
                "http://localhost:8080/wp-json/wp/v2/categories/" + catId,
                {
                    method: 'DELETE',
                    headers: myHeaders,
                    body: JSON.stringify({
                        force: "true",
                    }),
                })
                .then(response => response.text())
                .then(() => state.categories = state.categories.filter(category => category.id !== catId))
                .catch(error => console.error('error', error));
        },

		delPosts({ state }, postId) {
			var myHeaders = new Headers();
			myHeaders.append("Authorization", "Basic dmFsZW50aW46UGNlZ2NlY3QyMjA5IQ==");

			var raw = JSON.stringify({
				force: "true",
			});

			var requestOptions = {
				method: "DELETE",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			};

			fetch("http://localhost:8080/wp-json/wp/v2/posts/" + postId, requestOptions)
				.then(() => state.posts = state.posts.filter(post => post.id !== postId))
				.catch((error) => console.log("error", error));
		},

		delComments({ state }, commId) {
			var myHeaders = new Headers();
			myHeaders.append("Authorization", "Basic dmFsZW50aW46UGNlZ2NlY3QyMjA5IQ==");

			var raw = JSON.stringify({
				force: "true",
			});

			var requestOptions = {
				method: "DELETE",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			};

			fetch("http://localhost:8080/wp-json/wp/v2/comments/" + commId, requestOptions)
				.then(() => state.comments = state.posts.filter(comment => comment.id !== commId))
				.catch((error) => console.log("error", error));
		},
	},
	getters: {
		getCurrentPost: (state) => (id) => {
			return state.posts.find((post) => post.id == id);
		},
		getPostsByCat: (state) => (catId) => {
			return state.posts.filter((post) => post.categories == catId);
		},
		getCommentByPost: (state) => (postId) => {
			return state.comments.filter((comm) => comm.post == postId);
		},
	},
	modules: {},
});

export default store;
