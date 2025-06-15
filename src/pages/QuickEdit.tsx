
import React from "react";
import PhotoEditor from "@/components/quickedit/PhotoEditor";

export default function QuickEdit() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 via-sky-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-3xl px-4 py-12">
        <PhotoEditor />
      </div>
    </main>
  );
}
