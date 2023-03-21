const fetch = require("node-fetch");

async function getApiData(url) {
  const response = await fetch("https://jsonplaceholder.typicode.com" + url);
  const data = await response.json();
  return data;
}

async function getUsers() {
  const users = getApiData("/users");
  const posts = getApiData("/posts");
  const comments = getApiData("/comments");
  try {
    await Promise.all([users, posts, comments]).then((data) => {
      const userData = data[0].map((user) => {
        const postRandom = data[1].filter((post) => {
          for (let i = 1; i < Math.floor(Math.random() * 10); i++) {
            return post.userId === user.id;
          }
        });
        const commentRandom = data[2].filter((comment) => {
          for (let i = 1; i < Math.floor(Math.random() * 10); i++) {
            return comment.postId === user.id;
          }
        });
        return {
          ...user,
          comments: commentRandom,
          posts: postRandom,
        };
      });
      // 3.
      console.log("users:", userData);

      // 4.
      const userDataNew = userData.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          postCount: user.posts.length,
          commentCount: user.comments.length,
        };
      });
      console.log("usersNew:", userDataNew);

      ///5.
      const usersThan3Comments = userDataNew.filter(
        (user) => user.commentCount > 3
      );
      console.log(
        `usersThan3Comments: ${usersThan3Comments.length}`,
        usersThan3Comments
      );

      //6.

      const userMostPosts = userDataNew.reduce((prev, current) => {
        return prev.postCount > current.postCount ? prev : current;
      });

      console.log("userMostPosts: ", userMostPosts);

      const userMostComments = userDataNew.reduce((prev, current) => {
        return prev.commentCount > current.commentCount ? prev : current;
      });

      console.log("userMostComments:", userMostComments);

      //7.
      userDataNew.sort((a, b) => b.postCount - a.postCount);
      console.log("sort user:", userDataNew);
    });
  } catch (error) {
    console.log("error", error.message);
  }
}

async function getId(a, b) {
  const idPost = getApiData(`/posts?id=${a}`);
  const idComment = getApiData(`/comments?postId=${b}`);
  try {
    await Promise.all([idPost, idComment]).then((value) => {
      const arrNew = value[0].map((post) => {
        const commentArr = value[1].filter((comment) => {
          for (let i = 1; i < Math.floor(Math.random() * 10); i++) {
            return comment;
          }
        });
        return {
          ...post,
          comments: commentArr,
        };
      });

      console.log(arrNew);
    });
  } catch (error) {
    console.log("e", error.message);
  }
}

async function start() {
  await Promise.all([getUsers(), getId(2, 2)]);
}

start();
