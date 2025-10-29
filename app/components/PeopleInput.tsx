"use client";

import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useState } from "react";
import { GET_PEOPLE } from "../people-content";

const CREATE_PERSON = gql`
  mutation CreatePerson($name: String!) {
    createPerson(name: $name) {
      id
      name
    }
  }
`;

export function PeopleInput() {
  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [GET_PEOPLE],
    awaitRefetchQueries: true,
  });

  const [newPersonName, setNewPersonName] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPersonName.trim()) return;

    try {
      await createPerson({
        variables: { name: newPersonName },
      });
      setNewPersonName("");
    } catch (err) {
      console.error("Error creating person:", err);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Add New Person
      </h2>
      <form onSubmit={handleCreate} className="flex gap-2">
        <input
          type="text"
          value={newPersonName}
          onChange={(e) => setNewPersonName(e.target.value)}
          placeholder="Enter name..."
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Add Person
        </button>
      </form>
    </div>
  );
}
