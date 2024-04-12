$(document).ready(function () {
  // jQuery code to manipulate HTML elements
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "GET",
    success: function (data) {
      console.log(data);
      data.forEach((post) => {
        $(".postlist").append(` 
                <div class="post">
                      <h2 class="post-title">${post.title}</h2>
                      <p class="post-body" style="display: none;">${post.body}</p>
                       
                      <button class="comments-btn myBtn" data-post=${post.id}>comments</button>
                       
                </div>`);
      });

      $(document).on("click", ".post-title", function () {
        $(this).parent().find(".post-body").slideToggle();
      });

      $(document).on("click", ".myBtn", function () {
        $(".comment-list").empty();
        let postId = $(this).data().post;

        $.ajax({
          type: "Get",
          url: `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
          success: function (response) {
            response.forEach((comment) =>
              $(".comment-list")
                .append(`<li class="comment-content"> <p><span class="name">${comment.body}</span></p></li>
                `)
            );
          },
        });

        $(".modal").fadeIn();
      });

      
    },
    error: function (xhr, status, error) {
      // Handle error response
      console.error("Error:", error);
    },
  });
});

$(document).on("click", ".close", () => {
  $(".modal").fadeOut();
});
$(document).on("click", (e) => {
  if ($(e.target).hasClass("modal")) {
    $(".modal").fadeOut();
  }
});
