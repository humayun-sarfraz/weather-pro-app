import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-5">
      <h1 className="display-3 mb-2">404</h1>
      <p className="lead mb-4">Sorry, that page does not exist.</p>
      <Link className="btn btn-primary" to="/">← Go back to Dashboard</Link>
    </div>
  );
}
