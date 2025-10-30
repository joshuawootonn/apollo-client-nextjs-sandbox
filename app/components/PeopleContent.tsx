"use client";

import { useBackgroundQuery, skipToken } from "@apollo/client/react";
import { Suspense, useState } from "react";
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

interface Person {
  id: string;
  name: string;
}

export function PeopleContent() {
  const randomId = "11";
  const [useSkipToken, setUseSkipToken] = useState(false);

  const [queryRef] = useBackgroundQuery<{ people: Person[] }>(
    GET_PEOPLE,
    useSkipToken ? skipToken : { variables: { id: randomId } }
  );

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
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setUseSkipToken(!useSkipToken)}
              className={`rounded-md px-6 py-2 font-medium transition-colors ${
                useSkipToken
                  ? "bg-gray-600 text-white hover:bg-gray-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {useSkipToken ? "Using skipToken" : "Using variables"}
            </button>
            <span className="text-sm text-gray-600">
              {useSkipToken
                ? "Query is skipped"
                : `Query active with ID: ${randomId}`}
            </span>
          </div>
          <PeopleInput />
          <Suspense
            fallback={
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="text-center text-gray-600">Loading...</div>
              </div>
            }
          >
            {queryRef && <PeopleList queryRef={queryRef} />}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
