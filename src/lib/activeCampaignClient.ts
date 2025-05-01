import fetch from "node-fetch"; // Se estiver usando Node.js <18

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
  lastName?: string;
  phone?: string;
}

export async function syncActiveCampaignContact(
  contactData: ContactData
): Promise<any> {
  if (!API_URL || !API_KEY) {
    throw new Error("ActiveCampaign API credentials are not configured.");
  }

  // Divide o nome em primeiro nome e sobrenome
  const nameParts = contactData.firstName?.split(" ") || [];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const payload = {
    contact: {
      email: contactData.email,
      firstName,
      lastName,
      phone: contactData.phone,
    },
  };

  try {
    const response = await fetch(`${API_URL}/contact/sync`, {
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
      console.error("ActiveCampaign API Error:", responseData);
      throw new Error(
        `ActiveCampaign API request failed with status ${response.status}: ${JSON.stringify(responseData.errors || responseData)}`
      );
    }

    console.log("ActiveCampaign contact sync successful:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error syncing contact with ActiveCampaign:", error);
    throw error;
  }
}
