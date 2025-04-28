import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// This is a Server Component - it can fetch data directly
async function getServerData() {
  // Simulate fetching data from an API
  return {
    title: "Server Component",
    description: "This component is rendered on the server",
    timestamp: new Date().toISOString(),
  };
}

export default async function ServerComponent() {
  // Fetch data directly in the server component
  const data = await getServerData();
  
  return (
    <Card className="w-full max-w-md mx-auto mb-8 shadow-lg">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>Server-side rendering example</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{data.description}</p>
        <p className="text-sm text-neutral-500">
          Generated at: {data.timestamp}
        </p>
      </CardContent>
    </Card>
  );
}
