import fetch from "node-fetch"; // Need to install node-fetch: npm install node-fetch

const API_URL = process.env.ACTIVECAMPAIGN_API_URL;
const API_KEY = process.env.ACTIVECAMPAIGN_API_KEY;

if (!API_URL || !API_KEY) {
  console.warn(
    "ActiveCampaign API URL or Key is missing in environment variables. Contact sync will be skipped."
  );
}

interface ContactData {
  email: string;
  firstName?: string;
  lastName?: string; // ActiveCampaign uses firstName/lastName
  phone?: string;
  // Add other fields as needed, like tags or list subscriptions
  // Example: "field[custom_field_id,0]": "Value"
}

// Function to sync contact with ActiveCampaign
export async function syncActiveCampaignContact(
  contactData: ContactData
): Promise<any> {
  if (!API_URL || !API_KEY) {
    throw new Error("ActiveCampaign API credentials are not configured.");
  }

  // Prepare the data for the contact_sync endpoint
  // Note: ActiveCampaign API v3 might use different field names or structure.
  // This example assumes v3 structure based on common patterns, but verify with docs.
  // The documentation often refers to v1 for contact_sync, which uses form-urlencoded data.
  // Let's assume v3 JSON for now, but be prepared to switch to v1 style if needed.

  // Splitting name into first and last name (simple split)
  const nameParts = contactData.firstName?.split(" ") || [];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || ""; // Handle cases with no last name

  const payload = {
    contact: {
      email: contactData.email,
      firstName: firstName,
      lastName: lastName,
      phone: contactData.phone,
      // Add fields for lists or tags if necessary
      // e.g., "fieldValues": [{ "field": "1", "value": "Some Value" }]
    },
  };

  try {
    const response = await fetch(`${API_URL}/api/3/contactSync`, {
      // Using /api/3/ endpoint
      method: "POST",
      headers: {
        "Api-Token": API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Handle API errors
      console.error("ActiveCampaign API Error:", responseData);
      throw new Error(
        `ActiveCampaign API request failed with status ${response.status}: ${JSON.stringify(responseData.errors || responseData)}`
      );
    }

    console.log("ActiveCampaign contact sync successful:", responseData);
    return responseData; // Contains information about the synced contact
  } catch (error) {
    console.error("Error syncing contact with ActiveCampaign:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
