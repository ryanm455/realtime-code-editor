import Menu from "@/components/Menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { readFileSync } from "fs";

type DependencyProps = {
  name: string;
  version: string;
};

type PackageProps = {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};

const { dependencies, devDependencies }: PackageProps = JSON.parse(
  readFileSync("package.json", "utf-8")
);

const Dependency = ({ name, version }: DependencyProps) => (
  <div className="flex justify-between">
    <span>{name}</span>
    <span>{version}</span>
  </div>
);

const AboutPage = () => (
  <>
    <Menu />
    <div className="container mx-auto flex flex-col gap-4 my-4">
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            This project was made for fun using Bun, ReactJS and NextJS. It is definitely finished enough to
            use in real life.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dependencies</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {Object.entries(dependencies).map(([dep, v]) => (
              <li key={dep}>
                <Dependency name={dep} version={v} />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dev Dependencies</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {Object.entries(devDependencies).map(([dep, v]) => (
              <li key={dep}>
                <Dependency name={dep} version={v} />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  </>
);

export default AboutPage;
