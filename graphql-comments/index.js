const { users, posts, comments } = require("./data");
const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type User {
    id: ID!
    fullName: String!
    posts:[Post!]!
    comments:[Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    user_id: ID!
    user:User!
    comments:[Comment!]!
  }

  type Comment {
    id: ID
    text: String!
    post_id: ID
    user:User!
  }

  type Query{
      #User
      users:[User!]!
      user(id:ID!):User

      #Post
      posts:[Post!]!
      post(id:ID!):Post

      #Comment
      comments:[Comment!]!
      comment(id:ID!):Comment
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {

    //user
      user:(parent,args) => {
        return users.find(user => user.id === args.id);

     
      } ,
      users:() => users,

      //post
      posts:() => posts,
      post:(parent,args) => {
          return posts.find(post => post.id === args.id);
      },

      //comment
      comments:() => comments,
      comment:(parent,args) =>{
          return comments.find(comment => comment.id === args.id);
      } 
  },
  Comment:{
      user:(parent,args) =>{
          return users.find(user => user.id === parent.user_id);
      } 
  },
  User:{
      posts:(parent,args) => {
          return posts.filter(post => post.user_id === parent.id);
      } ,
      comments:(parent,args) => {
          return comments.filter(comment => comment.user_id === parent.id);
      }
  },
  Post:{
      user:(parent,args) => {
          return users.find(user => user.id === parent.user_id);
      },
      comments:(parent,args) => {
          return comments.filter(comment => comment.post_id === parent.id);
      }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
