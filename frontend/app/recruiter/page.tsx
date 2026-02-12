import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Server, Code, Layers, GitBranch } from "lucide-react";

export default function RecruiterPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <h1 className="text-4xl font-bold text-white">Architecture & Tech Stack</h1>
      </div>

      <section className="space-y-6">
        <p className="text-lg text-slate-400 leading-relaxed">
          FreshList is built as a cloud-native, serverless application designed for scalability, performance, and maintainability.
          Below is a breakdown of the technical choices and architecture.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TechCard
            icon={<Code className="text-primary" />}
            title="Frontend"
            items={[
              "Next.js 14 (App Router)",
              "TypeScript",
              "Tailwind CSS + Shadcn UI",
              "Lucide React Icons",
              "Deployed on Vercel"
            ]}
          />
          <TechCard
            icon={<Server className="text-indigo-400" />}
            title="Backend"
            items={[
              "AWS Lambda (Node.js 20)",
              "TypeScript",
              "Serverless Architecture",
              "Single Responsibility Handlers",
              "REST API via API Gateway"
            ]}
          />
          <TechCard
            icon={<Layers className="text-emerald-400" />}
            title="Infrastructure"
            items={[
              "Terraform (IaC)",
              "DynamoDB (Single Table Design)",
              "API Gateway HTTP API",
              "CloudWatch Logs",
              "Least Privilege IAM Roles"
            ]}
          />
          <TechCard
            icon={<GitBranch className="text-rose-400" />}
            title="CI/CD & DevOps"
            items={[
              "GitHub Actions",
              "AWS OIDC Authentication",
              "Automated Terraform Apply",
              "Vercel Deployment",
              "Local Build Scripts for Lambda"
            ]}
          />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Badge variant="outline" className="text-primary border-primary">Key Learnings</Badge>
          </h2>
          <ul className="space-y-3 text-slate-400 list-disc pl-5">
            <li><strong className="text-slate-200">Serverless Optimization:</strong> Keeping Lambda bundle size small by excluding devDependencies and using efficient build scripts.</li>
            <li><strong className="text-slate-200">IaC with Terraform:</strong> Managing state and resources declaratively ensures reproducible environments.</li>
            <li><strong className="text-slate-200">Modern Frontend Patterns:</strong> Leveraging Next.js 14 Server Components and Client Components effectively for a smooth UX.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Badge variant="outline" className="text-indigo-400 border-indigo-400">Future Improvements</Badge>
          </h2>
          <ul className="space-y-3 text-slate-400 list-disc pl-5">
            <li><strong className="text-slate-200">Real Authentication:</strong> Replace mock auth with NextAuth.js (Cognito or Auth0).</li>
            <li><strong className="text-slate-200">AI Integration:</strong> Use OpenAI API to generate dynamic meal plans based on real user input.</li>
            <li><strong className="text-slate-200">Offline Mode:</strong> Implement PWA features for grocery shopping without internet.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function TechCard({ icon, title, items }: any) {
  return (
    <Card className="border-slate-800 bg-slate-900/40">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="p-2 bg-slate-950 rounded border border-slate-800">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item: string, i: number) => (
            <li key={i} className="text-sm text-slate-400 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}