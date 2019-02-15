const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    nothing: () => true
  },
  Subscription: {
    posts: {
      subscribe: async (parent, args, context) => {
        return context.prisma.$subscribe
          .post({
            mutation_in: ['CREATED', 'UPDATED'],
          })
          .node()
      },
      resolve: payload => {
        return payload
      },
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma,
  },
})

server.start(() => console.log('Server is running on http://localhost:4000'))
