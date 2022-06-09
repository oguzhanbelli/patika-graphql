const authors = [
  {
    id: "1",
    name: "Albert",
    surname: "Einstein",
    age: 50,
    
   
  },
  {
    id: "2",
    name: "Oğuzhan",
    surname: "Belli",
    age: 23,
   
  },
];
const books = [
  { id: "1", title: "Yabancı", score: 6.9, author_id: "1", isPublished: true },
  { id: "1", title: "Tabancı Kitap 2", score: 9.6, author_id: "1", isPublished: false },
  {
    id: "2",
    title: "Deneme Kitap",
    score: 9,
    author_id: "2",
    isPublished: false,
  },
];

module.exports = {
  authors,

  books,
};
