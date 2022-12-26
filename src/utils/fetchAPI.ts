const API_URL = process.env.WORDPRESS_API_URL as string;

const fetchAPI = async (
  query = "",
  { variables }: Record<string, any> = {},
) => {
  const headers = { "Content-Type": "application/json" } as {
    [key: string]: string;
  };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
};

export default fetchAPI;
