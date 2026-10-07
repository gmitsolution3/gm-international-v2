import { IInternProfile, InternProfileFormValues } from "./types/validations/intern";


const BASE = process.env.NEXT_PUBLIC_EXPRESS_BASE_URL;

export async function createInternProfile(
  payload: InternProfileFormValues,
): Promise<IInternProfile> {
  const res = await fetch(`${BASE}/api/v1/intern/profile/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody?.message || "Failed to create intern profile");
  }

  const json = await res.json();
  return json.data ?? json;
}

/* -------------------------------------------------------------------------- */
/*                              Update Intern Profile                          */
/* -------------------------------------------------------------------------- */

export async function updateInternProfile(
  id: string,
  payload: InternProfileFormValues,
): Promise<IInternProfile> {
  const res = await fetch(`${BASE}/api/v1/intern/profile/upd-profile/${id}`, {
    method: "PUT", // change to PATCH if your API expects it
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody?.message || "Failed to update intern profile");
  }

  const json = await res.json();
  return json.data ?? json;
}
