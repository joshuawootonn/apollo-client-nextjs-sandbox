import { gql } from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

// Type definitions for our data
interface Person {
  id: string;
  name: string;
}

interface QueryResolverArgs {
  id: string;
}

interface CreatePersonArgs {
  name: string;
}

interface UpdatePersonArgs {
  id: string;
  name: string;
}

interface DeletePersonArgs {
  id: string;
}

interface GetPeopleArgs {
  id: string;
}

// Simple in-memory data store
const people: Person[] = [
  { id: "1", name: "Alice Johnson" },
  { id: "2", name: "Bob Smith" },
  { id: "3", name: "Charlie Brown" },
];

let nextId = 4;

// GraphQL Schema
const typeDefs = gql`
  type Person {
    id: ID!
    name: String!
  }

  type Query {
    people(id: ID!): [Person!]!
    person(id: ID!): Person
  }

  type Mutation {
    createPerson(name: String!): Person!
    updatePerson(id: ID!, name: String!): Person
    deletePerson(id: ID!): Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    people: (_parent: object, _args: GetPeopleArgs): Person[] => people,
    person: (
      _parent: object,
      { id }: QueryResolverArgs
    ): Person | undefined => {
      return people.find((p) => p.id === id);
    },
  },
  Mutation: {
    createPerson: (
      _parent: object,
      { name }: CreatePersonArgs
    ): Person => {
      const newPerson: Person = {
        id: String(nextId++),
        name,
      };
      people.push(newPerson);
      return newPerson;
    },
    updatePerson: (
      _parent: object,
      { id, name }: UpdatePersonArgs
    ): Person | undefined => {
      const person = people.find((p) => p.id === id);
      if (person) {
        person.name = name;
      }
      return person;
    },
    deletePerson: (
      _parent: object,
      { id }: DeletePersonArgs
    ): boolean => {
      const index = people.findIndex((p) => p.id === id);
      if (index > -1) {
        people.splice(index, 1);
        return true;
      }
      return false;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export async function POST(req: Request) {
  return handler(req);
}

export async function GET(req: Request) {
  return handler(req);
}
