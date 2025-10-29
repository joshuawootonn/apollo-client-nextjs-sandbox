"use client";

import { PeopleList } from "./PeopleList";
import { PeopleInput } from "./PeopleInput";
import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
  query GetPeople($id: ID!) {
    people(id: $id) {
      id
      name
    }
  }
`;

export function PeopleContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">People Manager</h1>
          <p className="mt-4 text-lg text-gray-600">
            A simple CRUD application built with Apollo Client and Next.js
          </p>
        </div>
        <div className="space-y-8">
          <PeopleInput />
          <PeopleList />
        </div>
      </div>
    </div>
  );
}
