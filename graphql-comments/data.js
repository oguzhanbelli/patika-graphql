const users = [
  { id: "1", fullName: "Oğuzhan Belli" },
  { id: "2", fullName: "Emirhan Belli" },
];

const posts = [
  { id: "1", title: "Oğuzhan'ın Gönderisi", user_id: "1" },
  { id: "2", title: "Oğuzhan'ın Diğer Gönderisi", user_id: "1" },
  { id: "3", title: "Emirhan'ın Gönderisi", user_id: "2" },
];

const comments = [
  { id: "1", text: "Lorem Ipsum", post_id: "1",user_id:"1" },
  { id: "2", text: "Lorem Ipsum doler", post_id: "1" ,user_id:"2"},
  { id: "3", text: "foo bar", post_id: "2" ,user_id:"2"},
  { id: "4", text: "foo bar baz", post_id: "3" ,user_id:"1"},
];


module.exports = {
    comments,
    posts,users
}