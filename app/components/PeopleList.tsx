"use client";

import { useState } from "react";
import { GET_PEOPLE } from "./PeopleContent";
import { useMutation, useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";

const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: ID!, $name: String!) {
    updatePerson(id: $id, name: $name) {
      id
      name
    }
  }
`;

const DELETE_PERSON = gql`
  mutation DeletePerson($id: ID!) {
    deletePerson(id: $id)
  }
`;

interface Person {
  id: string;
  name: string;
}

export function PeopleList() {
  const { data, error } = useQuery<{ people: Person[] }>(GET_PEOPLE, {
    variables: { id: "11" },
  });
  const [updatePerson] = useMutation(UPDATE_PERSON, {
    refetchQueries: [GET_PEOPLE],
  });
  const [deletePerson] = useMutation(DELETE_PERSON, {
    refetchQueries: [GET_PEOPLE],
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleUpdate = async (id: string) => {
    if (!editingName.trim()) return;

    try {
      await updatePerson({
        variables: { id, name: editingName },
      });
      setEditingId(null);
      setEditingName("");
    } catch (err) {
      console.error("Error updating person:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePerson({
        variables: { id },
      });
    } catch (err) {
      console.error("Error deleting person:", err);
    }
  };

  const startEdit = (person: Person) => {
    setEditingId(person.id);
    setEditingName(person.name);
  };

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="text-sm text-red-700">
          Error loading people: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        People ({data?.people.length || 0})
      </h2>

      {data?.people.length === 0 ? (
        <p className="text-gray-500">No people added yet. Create one above!</p>
      ) : (
        <div className="space-y-2">
          {data?.people.map((person) => (
            <div
              key={person.id}
              className="flex items-center gap-3 rounded-md border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
            >
              {editingId === person.id ? (
                <>
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="flex-1 rounded-md border border-gray-300 px-3 py-1 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={() => handleUpdate(person.id)}
                    className="rounded-md bg-green-600 px-4 py-1 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="rounded-md bg-gray-300 px-4 py-1 text-sm font-medium text-gray-900 hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-lg text-gray-900">
                    {person.name}
                  </span>
                  <button
                    onClick={() => startEdit(person)}
                    className="rounded-md bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700 hover:bg-blue-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(person.id)}
                    className="rounded-md bg-red-100 px-4 py-1 text-sm font-medium text-red-700 hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
