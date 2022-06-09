const { ApolloServer, gql } = require('apollo-server');
const {users,participants,events,locations} = require('./data');
const {
    ApolloServerPluginLandingPageGraphQLPlayground,
  } = require("apollo-server-core");
  
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
type User {
    id:ID!
    username:String!
    email:String!
}
type Event {
    id:ID!
    title:String!
    desc:String
    date:String!
    from:String!
    to:String!
    location_id:ID!
    user_id:ID!
    user:User!
    participants:[Participant]!
    location:Location!

}

type Location {
    id:ID!
    name:String!
    desc:String!
    lat:Float!
    lng:Float!

}


type Participant {
    id:ID!
    user_id:ID!
    event_id:ID!
    user:User!

}

type Query{

    #User
    users:[User!]!
    user(id:ID!):User

    #Event

    events:[Event!]!
    event(id:ID!):Event

    #Location

    locations:[Location!]!
    location(id:ID!):Location

    #Participant
    participants:[Participant!]!
    participant(id:ID!):Participant




}

`;


const resolvers = {
    Query:{
        users:() => users,
        user:(parent,args) => {
           return users.find(user => Number(user.id) === Number(args.id));
    
         
          } ,
        //event

        events:() => events,
        event:(parent,args) => {
            return events.find(event => Number(event.id) === Number(args.id));
        },

        // location

        locations:() => locations,
        location:(parent,args) => {
            return locations.find(location => Number(location.id) === Number(args.id));
        },
        //Participant
        participants:() => participants,
        participant:(parent,args) => {
            return participants.find(participant => participant.id === Number(args.id));
        },

    



    },
    Participant:{
        user:(parent,args)=> {
            const user = users.find(user => user.id === parent.user_id);
            return user;

        }
    },
    Event:{
        user:(parent,args) => {
            return users.find(user => user.id === parent.user_id);
        },
        participants:(parent,args) => {
            return participants.filter(participant => participant.event_id === parent.id)
        },
        location:(parent,args) => {
            return locations.find(location => location.id === parent.location_id);
        }

    }
  };

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });