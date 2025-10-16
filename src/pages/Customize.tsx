import { CustomizationStepper } from "../components/CustomizationStepper";

export default function Customize() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Your Own Style</h1>
      <CustomizationStepper />
    </div>
  );
}